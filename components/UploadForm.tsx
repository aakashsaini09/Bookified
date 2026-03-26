'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useRef } from 'react';
import { FileUp, Image as ImageIcon, X } from 'lucide-react';
import { UploadSchema } from '@/lib/zod';
import { voiceOptions, voiceCategories } from '@/lib/constants';
import { LoadingOverlay } from './LoadingOverlay';
import type { UploadFormData } from '@/lib/zod';

export default function UploadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState<File | null>(null);
  const [selectedCover, setSelectedCover] = useState<File | null>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    register,
  } = useForm<UploadFormData>({
    resolver: zodResolver(UploadSchema),
    defaultValues: {
      voiceId: 'rachel',
    },
  });

  const watchVoiceId = watch('voiceId');

  const handlePdfDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files?.[0] && files[0].type === 'application/pdf') {
      setSelectedPdf(files[0]);
      setValue('pdf', files[0]);
    }
  };

  const handleCoverDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files?.[0]) {
      setSelectedCover(files[0]);
      setValue('coverImage', files[0]);
    }
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.[0]) {
      setSelectedPdf(files[0]);
      setValue('pdf', files[0]);
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.[0]) {
      setSelectedCover(files[0]);
      setValue('coverImage', files[0]);
    }
  };

  const removePdf = () => {
    setSelectedPdf(null);
    if (pdfInputRef.current) {
      pdfInputRef.current.value = '';
    }
  };

  const removeCover = () => {
    setSelectedCover(null);
    if (coverInputRef.current) {
      coverInputRef.current.value = '';
    }
  };

  const onSubmit = async (data: UploadFormData) => {
    setIsSubmitting(true);
    try {
      console.log('Form submitted:', data);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <LoadingOverlay isLoading={isSubmitting} message="Processing your book..." />
      
      <form onSubmit={handleSubmit(onSubmit)} className="new-book-wrapper">
        {/* PDF Upload */}
        <div>
          <label className="form-label">Book PDF File</label>
         <div
            onDrop={handlePdfDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => pdfInputRef.current?.click()}
            className={`upload-dropzone ${selectedPdf ? 'upload-dropzone-uploaded' : 'border border-dashed border-[#ddd]'}`}
          >
            <input
              ref={pdfInputRef}
              type="file"
              accept="application/pdf"
              onChange={handlePdfChange}
              className="hidden"
            />
            
            {selectedPdf ? (
              <div className="flex items-center justify-between w-full px-6 py-4">
                <div className="flex items-center gap-3">
                  <FileUp className="upload-dropzone-icon" />
                  <div>
                    <p className="upload-dropzone-text">{selectedPdf.name}</p>
                    <p className="upload-dropzone-hint">
                      {(selectedPdf.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removePdf();
                  }}
                  className="upload-dropzone-remove"
                >
                  <X size={20} />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-4">
                <FileUp className="upload-dropzone-icon" />
                <p className="upload-dropzone-text">Click to upload PDF</p>
                <p className="upload-dropzone-hint">PDF file (max 50MB)</p>
              </div>
            )}
          </div>
          {errors.pdf && <p className="mt-2 text-sm text-red-500">{errors.pdf.message}</p>}
        </div>

        {/* Cover Image Upload */}
        <div>
          <label className="form-label">Cover Image (Optional)</label>
          <div
            onDrop={handleCoverDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => coverInputRef.current?.click()}
            className={`upload-dropzone ${selectedCover ? 'upload-dropzone-uploaded' : 'border border-dashed border-[#ddd]'}`}
          >
            <input
              ref={coverInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleCoverChange}
              className="hidden"
            />
            
            {selectedCover ? (
              <div className="flex items-center justify-between w-full px-6 py-4">
                <div className="flex items-center gap-3">
                  <ImageIcon className="upload-dropzone-icon" />
                  <div>
                    <p className="upload-dropzone-text">{selectedCover.name}</p>
                    <p className="upload-dropzone-hint">
                      {(selectedCover.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeCover();
                  }}
                  className="upload-dropzone-remove"
                >
                  <X size={20} />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-4">
                <ImageIcon className="upload-dropzone-icon" />
                <p className="upload-dropzone-text">Click to upload cover image</p>
                <p className="upload-dropzone-hint">Leave empty to auto-generate from PDF</p>
              </div>
            )}
          </div>
          {errors.coverImage && <p className="mt-2 text-sm text-red-500">{errors.coverImage.message}</p>}
        </div>

        {/* Title Input */}
        <div>
          <label className="form-label">Title</label>
          <input
            type="text"
            placeholder="ex: Rich Dad Poor Dad"
            className="form-input"
            {...register('title')}
          />
          {errors.title && <p className="mt-2 text-sm text-red-500">{errors.title.message}</p>}
        </div>

        {/* Author Input */}
        <div>
          <label className="form-label">Author Name</label>
          <input
            type="text"
            placeholder="ex: Robert Kiyosaki"
            className="form-input"
            {...register('author')}
          />
          {errors.author && <p className="mt-2 text-sm text-red-500">{errors.author.message}</p>}
        </div>

        {/* Voice Selector */}
        <div>
          <label className="form-label">Choose Assistant Voice</label>
          
          {/* Male Voices */}
          <div className="mb-6">
            <p className="text-sm font-medium text-[#555] mb-3">Male Voices</p>
            <div className="voice-selector-options">
              {voiceCategories.male.map((voiceKey) => {
                const voice = voiceOptions[voiceKey as keyof typeof voiceOptions];
                const isSelected = watchVoiceId === voice.id;
                return (
                  <label
                    key={voice.id}
                    className={`voice-selector-option ${
                      isSelected
                        ? 'voice-selector-option-selected'
                        : 'voice-selector-option-default'
                    }`}
                  >
                    <input
                      type="radio"
                      value={voice.id}
                      {...register('voiceId')}
                      className="hidden"
                    />
                    <div className="flex flex-col text-center">
                      <span className="font-semibold text-[#212a3b]">{voice.name}</span>
                      <span className="text-xs text-[#666]">{voice.description}</span>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Female Voices */}
          <div>
            <p className="text-sm font-medium text-[#555] mb-3">Female Voices</p>
            <div className="voice-selector-options">
              {voiceCategories.female.map((voiceKey) => {
                const voice = voiceOptions[voiceKey as keyof typeof voiceOptions];
                const isSelected = watchVoiceId === voice.id;
                return (
                  <label
                    key={voice.id}
                    className={`voice-selector-option ${
                      isSelected
                        ? 'voice-selector-option-selected'
                        : 'voice-selector-option-default'
                    }`}
                  >
                    <input
                      type="radio"
                      value={voice.id}
                      {...register('voiceId')}
                      className="hidden"
                    />
                    <div className="flex flex-col text-center">
                      <span className="font-semibold text-[#212a3b]">{voice.name}</span>
                      <span className="text-xs text-[#666]">{voice.description}</span>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {errors.voiceId && <p className="mt-3 text-sm text-red-500">{errors.voiceId.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="form-btn disabled:opacity-70 disabled:cursor-not-allowed"
        >
          Begin Synthesis
        </button>
      </form>
    </>
  );
}
