// FileUploader.tsx
import React, { useState, useRef, useCallback } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Typography,
  Box,
  alpha,
  useTheme,
} from "@mui/material";

interface FileUploaderProps {
  /** Callback function triggered when files are selected or removed.
   *  Passes an array of File objects.
   */
  onFilesSelected: (files: File[]) => void;
  /** Allow multiple file selection */
  multiple?: boolean;
  /** Comma-separated string of accceptable file types (e.g., "image/*, .pdf") */
  accept?: string;
  /** Title for the uploader section */
  title?: string;
  /** Color theme for the uploader */
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  /** Optional message to display below the file list */
  helperText?: string;
  /** Maximum upload size in KB to display in the helper text */
  maxSize?: number;
  /** Custom CSS styling */
  sx?: object;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  onFilesSelected,
  multiple = false,
  accept,
  title = "Upload Files",
  color = "primary",
  helperText,
  maxSize,
  sx = {},
}) => {
  const theme = useTheme();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const newFilesArray = Array.from(event.target.files);
        let updatedFiles: File[];

        if (multiple) {
          // Add new files, ensuring no duplicates by name (simple check)
          // For more robust duplicate check, consider file content or lastModified
          updatedFiles = [...selectedFiles];
          newFilesArray.forEach((newFile) => {
            if (
              !selectedFiles.some(
                (existingFile) => existingFile.name === newFile.name
              )
            ) {
              updatedFiles.push(newFile);
            }
          });
        } else {
          // Replace existing file(s) if not multiple
          updatedFiles = newFilesArray;
        }

        setSelectedFiles(updatedFiles);
        onFilesSelected(updatedFiles);

        // Reset the input value to allow selecting the same file again if removed
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    },
    [multiple, onFilesSelected, selectedFiles]
  );

  const handleFileDrop = useCallback(
    (files: FileList | null) => {
      if (files) {
        const newFilesArray = Array.from(files);
        let updatedFiles: File[];

        if (multiple) {
          updatedFiles = [...selectedFiles];
          newFilesArray.forEach((newFile) => {
            if (
              !selectedFiles.some(
                (existingFile) => existingFile.name === newFile.name
              )
            ) {
              updatedFiles.push(newFile);
            }
          });
        } else {
          updatedFiles = newFilesArray.slice(0, 1); // Take only the first file if multiple is false
        }

        setSelectedFiles(updatedFiles);
        onFilesSelected(updatedFiles);
      }
    },
    [multiple, onFilesSelected, selectedFiles]
  );

  const handleRemoveFile = useCallback(
    (fileNameToRemove: string) => {
      const updatedFiles = selectedFiles.filter(
        (file) => file.name !== fileNameToRemove
      );
      setSelectedFiles(updatedFiles);
      onFilesSelected(updatedFiles);
    },
    [onFilesSelected, selectedFiles]
  );

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  }, [isDragging]);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      // Check if there are accepted file types
      if (accept) {
        const acceptedTypes = accept.split(',').map(type => type.trim().toLowerCase());
        const droppedFiles = Array.from(files).filter(file => {
          // Check if the file type matches any of the accepted types
          return acceptedTypes.some(type => {
            // Handle wildcard types (e.g., "image/*")
            if (type.endsWith('/*')) {
              const category = type.slice(0, -2);
              return file.type.startsWith(category);
            }
            // Handle specific extensions (e.g., ".pdf")
            else if (type.startsWith('.')) {
              return file.name.toLowerCase().endsWith(type);
            }
            // Handle specific mime types
            else {
              return file.type === type;
            }
          });
        });
        
        handleFileDrop(droppedFiles.length > 0 ? 
          Object.assign(new DataTransfer(), { files: droppedFiles }).files : null);
      } else {
        // No file type restrictions
        handleFileDrop(files);
      }
    }
  }, [accept, handleFileDrop, isDragging]);

  // Helper to format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <Box>
      {title && (
        <Typography 
          variant="body2" 
          gutterBottom 
          sx={{
            fontWeight: 600,
            mb: 2,
            color: theme => theme.palette.text.primary
          }}
        >
          {title}
        </Typography>
      )}
      
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        multiple={multiple}
        accept={accept}
      />
      
      {maxSize && (
        <Typography 
          variant="body2" 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            color: 'text.secondary',
            mb: 2
          }}
        >
          <i className="tabler-info-circle" style={{ fontSize: "1rem", marginRight: '4px' }} />
          Max size: {formatFileSize(maxSize * 1024)}
        </Typography>
      )}

      {selectedFiles.length > 0 ? (
        <Box
          sx={{
            border: '1px dashed',
            borderColor: 'divider',
            borderRadius: theme => theme.shape.borderRadius + 'px',
            p: 4,
            backgroundColor: alpha(theme.palette.background.default, 0.6),
            minHeight: '100px',
          }}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <List dense sx={{ py: 0 }}>
            {selectedFiles.map((file) => (
              <ListItem
                key={file.name + file.lastModified}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleRemoveFile(file.name)}
                    sx={{
                      color: 'error.main',
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.error.main, 0.08),
                      }
                    }}
                  >
                    <i className="tabler-trash" style={{ fontSize: "1.25rem" }} />
                  </IconButton>
                }
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  mb: 1,
                  backgroundColor: theme => theme.palette.background.paper,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                  transition: theme => theme.transitions.create(['background-color', 'transform']),
                  '&:hover': {
                    backgroundColor: theme => alpha(theme.palette.primary.main, 0.04),
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      backgroundColor: alpha(theme.palette.primary.main, 0.12),
                    }}
                  >
                    <i 
                      className="tabler-file" 
                      style={{ 
                        fontSize: "1.25rem", 
                        color: theme.palette.primary.main 
                      }} 
                    />
                  </Box>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary' }}>
                      {file.name}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {formatFileSize(file.size)}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      ) : (
        <Box
          onClick={handleBrowseClick}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px dashed',
            borderColor: isDragging ? color : 'divider',
            borderRadius: theme => theme.shape.borderRadius + 'px',
            p: 4,
            backgroundColor: isDragging 
              ? alpha(theme.palette[color].main, 0.08)
              : alpha(theme.palette.background.default, 0.6),
            minHeight: '150px',
            transition: theme => theme.transitions.create(['background-color', 'border-color', 'transform']),
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: alpha(theme.palette[color].main, 0.05),
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 8px rgba(0,0,0,0.05)'
            }
          }}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Box 
            sx={{ 
              p: 2, 
              borderRadius: '50%', 
              backgroundColor: alpha(theme.palette.primary.main, 0.08),
              mb: 2,
              transform: isDragging ? 'scale(1.1)' : 'scale(1)',
              transition: theme => theme.transitions.create(['transform']),
            }}
          >
            <i 
              className={isDragging ? "tabler-cloud-download" : "tabler-cloud-upload"} 
              style={{ 
                fontSize: "2rem", 
                color: theme.palette.primary.main 
              }} 
            />
          </Box>
          <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
            {isDragging ? "Release to upload files" : "Drop files here or click to browse"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {isDragging ? "We're ready when you are" : "No files selected"}
          </Typography>
        </Box>
      )}
      
      {helperText && (
        <Typography 
          variant="caption" 
          color="text.secondary" 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mt: 2 
          }}
        >
          <i className="tabler-info-circle" style={{ fontSize: "0.875rem", marginRight: '4px' }} />
          {helperText}
        </Typography>
      )}
    </Box>
  );
};

export default FileUploader;
