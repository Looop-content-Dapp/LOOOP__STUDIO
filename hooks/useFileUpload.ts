import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { Alert, Linking, Platform } from 'react-native';

export interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
  bytes: number;
  error?: {
    message: string;
  };
}

const CLOUDINARY_CONFIG = {
  uploadPreset: 'Looop_preset', // TODO: Please @joeephwild replace wwith Looop upload preset
  cloudName: process.env.EXPO_CLOUD_NAME || 'dx8jul61w', // TODO: Please @joeephwild replace wwith Looop cloud name
  apiBaseUrl: 'https://api.cloudinary.com/v1_1',
} as const;

// File type enums
export enum FileType {
  AUDIO = 'audio',
  IMAGE = 'image',
  VIDEO = 'video',
}

// Mime type mappings
export const MimeTypes = {
  [FileType.AUDIO]: ['audio/mpeg', 'audio/wav', 'audio/ogg'] as const,
  [FileType.IMAGE]: ['image/jpeg', 'image/png', 'image/webp'] as const,
  [FileType.VIDEO]: ['video/mp4', 'video/quicktime'] as const,
} as const;

// Type for supported mime types
export type SupportedMimeType = (typeof MimeTypes)[keyof typeof MimeTypes][number];

// Interface for file constraints
interface FileConstraints {
  mimeTypes: readonly string[];
  maxSize: number;
}

// Interface for file constraints configuration
interface FileConstraintsConfig {
  [FileType.AUDIO]: FileConstraints;
  [FileType.IMAGE]: FileConstraints;
  [FileType.VIDEO]: FileConstraints;
}

// Interface for uploaded file
export interface UploadedFile {
  uri: string;
  name: string;
  type: SupportedMimeType;
  size: number;
}

// Interface for upload result
export interface UploadResult {
  success: boolean;
  file?: UploadedFile;
  error?: string;
}

// Interface for hook return type
export interface UseFileUploadReturn {
  files: UploadedFile[];
  isLoading: boolean;
  error: string | null;
  setError: Dispatch<SetStateAction<string | null>>;
  progress: number;
  pickFile: (type?: FileType) => Promise<UploadResult | null>;
  removeFile: (file: UploadedFile) => Promise<void>;
  clearCache: () => Promise<void>;
}

const useFileUpload = (): UseFileUploadReturn => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  // File constraints
  const fileConstraints: FileConstraintsConfig = {
    [FileType.AUDIO]: {
      mimeTypes: MimeTypes[FileType.AUDIO],
      maxSize: 50 * 1024 * 1024, // 50MB
    },
    [FileType.IMAGE]: {
      mimeTypes: MimeTypes[FileType.IMAGE],
      maxSize: 50 * 1024 * 1024, // 50MB
    },
    [FileType.VIDEO]: {
      mimeTypes: MimeTypes[FileType.VIDEO],
      maxSize: 100 * 1024 * 1024, // 100MB
    },
  };

  const validateFile = async (
    fileUri: string,
    fileType: FileType,
    mimeType: string
  ): Promise<boolean> => {
    const constraints = fileConstraints[fileType];

    if (!constraints) {
      throw new Error('Unsupported file type');
    }

    if (!constraints.mimeTypes.includes(mimeType as SupportedMimeType)) {
      throw new Error(
        `Invalid ${fileType} format. Supported formats: ${constraints.mimeTypes.join(', ')}`
      );
    }

    // Check file size using Expo FileSystem
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    if (!fileInfo.exists) {
      throw new Error('File does not exist.');
    }
    if (fileInfo.size > constraints.maxSize) {
      throw new Error(`File size exceeds ${constraints.maxSize / (1024 * 1024)}MB limit`);
    }

    return true;
  };

  const requestMediaLibraryPermissions = async (): Promise<boolean> => {
    if (Platform.OS !== 'ios' && Platform.OS !== 'android') return true;

    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'This app needs access to your photo library to upload media. Please enable it in your device settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Open Settings',
              onPress: () => Linking.openSettings(),
            },
          ]
        );
        return false;
      }

      return true;
    } catch (err) {
      console.error('Error requesting permissions:', err);
      return false;
    }
  };

  const pickImageOrVideo = async (type: FileType): Promise<UploadResult | null> => {
    try {
      const hasPermission = await requestMediaLibraryPermissions();
      if (!hasPermission) {
        throw new Error('Media library access denied');
      }

      const options: ImagePicker.ImagePickerOptions = {
        mediaTypes:
          type === FileType.IMAGE
            ? ImagePicker.MediaTypeOptions.Images
            : ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        quality: 1,
      };

      const result = await ImagePicker.launchImageLibraryAsync(options);

      if (result.canceled) {
        return null;
      }

      const asset = result.assets[0];

      const mimeType = asset.mimeType || (type === FileType.IMAGE ? 'image/jpeg' : 'video/mp4');

      await validateFile(asset.uri, type, mimeType);

      const filename = asset.uri.split('/').pop() || `${type}-${Date.now()}`;

      const newFile: UploadedFile = {
        uri: asset.uri,
        name: filename,
        type: mimeType as SupportedMimeType,
        size: asset.fileSize || 0,
      };

      setFiles((prevFiles) => [...prevFiles, newFile]);

      return {
        success: true,
        file: newFile,
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    }
  };

  const pickAudio = async (): Promise<UploadResult | null> => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [...MimeTypes[FileType.AUDIO]],
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        return null;
      }

      const file = result.assets[0];
      await validateFile(file.uri, FileType.AUDIO, file.mimeType || 'audio/mpeg');

      const newFile: UploadedFile = {
        uri: file.uri,
        name: file.name || `audio-${Date.now()}`,
        type: file.mimeType as SupportedMimeType,
        size: file.size || 0,
      };

      setFiles((prevFiles) => [...prevFiles, newFile]);

      return {
        success: true,
        file: newFile,
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    }
  };

  const pickFile = useCallback(
    async (type: FileType = FileType.IMAGE): Promise<UploadResult | null> => {
      setError(null);
      setProgress(0);
      setIsLoading(true);

      try {
        let result;

        switch (type) {
          case FileType.AUDIO:
            result = await pickAudio();
            break;
          default:
            result = await pickImageOrVideo(type);
        }

        if (!result?.file) {
          return null;
        }

        // Upload to Cloudinary
        const uploadedFile = await uploadToCloudinary(result.file, result.file.uri, type);

        setFiles((prevFiles) => [...prevFiles, uploadedFile]);

        return {
          success: true,
          file: uploadedFile,
        };
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        setError(errorMessage);
        return {
          success: false,
          error: errorMessage,
        };
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const removeFile = useCallback(async (fileToRemove: UploadedFile): Promise<void> => {
    try {
      // If the file is in cache, remove it
      if (fileToRemove.uri.startsWith(FileSystem.cacheDirectory as string)) {
        await FileSystem.deleteAsync(fileToRemove.uri);
      }
      setFiles((prevFiles) => prevFiles.filter((file) => file.uri !== fileToRemove.uri));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(`Error removing file: ${errorMessage}`);
    }
  }, []);

  const clearCache = useCallback(async (): Promise<void> => {
    try {
      await FileSystem.deleteAsync(FileSystem.cacheDirectory + 'DocumentPicker', {
        idempotent: true,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(`Error clearing cache: ${errorMessage}`);
    }
  }, []);

  const uploadToCloudinary = async (
    file: UploadedFile,
    fileUri: string,
    type: FileType
  ): Promise<UploadedFile> => {
    // Implementation of uploadToCloudinary function
    // This is a placeholder and should be replaced with the actual implementation
    return file;
  };

  return {
    files,
    isLoading,
    error,
    setError,
    progress,
    pickFile,
    removeFile,
    clearCache,
  };
};

export default useFileUpload;
