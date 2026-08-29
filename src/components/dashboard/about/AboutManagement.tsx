'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import {
  Building2,
  Video,
  ExternalLink,
  Save,
  Loader2,
  Sparkles,
  Target,
  Eye,
  Heart,
  HelpCircle,
  Play,
  Code2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { serverMutation } from '@/lib/api/serverMutation';
import { EmbedVideoPlayer } from '@/components/common/EmbedVideoPlayer';
import { ImageUploader } from '@/components/common/ImageUploader';

export interface CollegeAboutData {
  id?: string;
  heading: string;
  subheading: string;
  description1: string;
  description2: string;
  videoEmbedUrl: string;
  videoThumbnail?: string | null;
  missionText: string;
  visionText: string;
  valuesText: string;
  establishedYear: string;
  eiinNumber: string;
  collegeCode: string;
  nuCode: string;
  updatedAt?: string;
}

interface AboutManagementProps {
  initialData: CollegeAboutData;
}

export const AboutManagement: React.FC<AboutManagementProps> = ({
  initialData,
}) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<CollegeAboutData>({
    defaultValues: {
      heading: initialData?.heading || '40+ Years of Academic Excellence in Nabiganj',
      subheading:
        initialData?.subheading ||
        'Empowering generations through quality education, discipline, and integrity since 1984.',
      description1: initialData?.description1 || '',
      description2: initialData?.description2 || '',
      videoEmbedUrl: initialData?.videoEmbedUrl || '',
      videoThumbnail: initialData?.videoThumbnail || '',
      missionText:
        initialData?.missionText ||
        'To provide inclusive, high-caliber education that cultivates critical intellect, civic duty, and ethical leadership.',
      visionText:
        initialData?.visionText ||
        'To stand as a leading center of educational distinction in Sylhet division, advancing digital literacy and academic excellence.',
      valuesText:
        initialData?.valuesText ||
        'Integrity, Academic Discipline, Inclusivity, Scientific Curiosity, and Community Devotion.',
      establishedYear: initialData?.establishedYear || '1984',
      eiinNumber: initialData?.eiinNumber || '129524',
      collegeCode: initialData?.collegeCode || '1301',
      nuCode: initialData?.nuCode || '1706',
    },
  });

  const rawVideoInput = watch('videoEmbedUrl');

  const onSubmit = async (data: CollegeAboutData) => {
    const toastId = toast.loading('Publishing institutional about details...');

    const payload = {
      heading: data.heading.trim(),
      subheading: data.subheading.trim(),
      description1: data.description1.trim(),
      description2: data.description2.trim(),
      videoEmbedUrl: data.videoEmbedUrl.trim(),
      videoThumbnail: data.videoThumbnail?.trim() || null,
      missionText: data.missionText.trim(),
      visionText: data.visionText.trim(),
      valuesText: data.valuesText.trim(),
      establishedYear: data.establishedYear.trim(),
      eiinNumber: data.eiinNumber.trim(),
      collegeCode: data.collegeCode.trim(),
      nuCode: data.nuCode.trim(),
    };

    try {
      const res = await serverMutation({
        path: 'about',
        method: 'PATCH',
        data: payload,
      });

      if (res?.success) {
        toast.success('About College information updated successfully!', {
          id: toastId,
        });
        router.refresh();
      } else {
        toast.error(res?.message || 'Failed to update about details', {
          id: toastId,
        });
      }
    } catch (error: any) {
      toast.error(error.message || 'Error occurred while saving about details', {
        id: toastId,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-border/80 bg-card p-6 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary mb-1">
            <Building2 className="h-3.5 w-3.5" />
            <span>Institutional Profile & Media</span>
          </div>
          <h1 className="font-serif text-2xl font-bold tracking-tight text-foreground">
            Manage About Information & Video Tour
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Update college narrative, mission, vision, official institutional codes, and paste raw iframe embed codes from YouTube, Facebook, Vimeo, etc.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/about"
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3.5 py-2 text-xs font-semibold text-foreground hover:bg-secondary transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span>View Public About Page</span>
          </Link>
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3.5 py-2 text-xs font-semibold text-foreground hover:bg-secondary transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span>View on Homepage</span>
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Section 1: Video Embed Code (Iframe) */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-border/70 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Video className="h-4 w-4" />
              </div>
              <div>
                <h2 className="font-serif text-base font-bold text-foreground">
                  Virtual Campus Tour / Video Embed Code (Iframe)
                </h2>
                <p className="text-xs text-muted-foreground">
                  Paste the full embed code (with &lt;iframe&gt;) from YouTube, Facebook, Vimeo, or any platform.
                </p>
              </div>
            </div>
            <span className="rounded-md bg-secondary px-2.5 py-1 text-[10px] font-bold text-primary flex items-center gap-1">
              <Code2 className="h-3.5 w-3.5" />
              Raw Iframe Embed
            </span>
          </div>

          <div className="grid gap-6 lg:grid-cols-12 items-start">
            {/* Input fields */}
            <div className="space-y-4 lg:col-span-6">
              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">
                  Paste Embed Code (&lt;iframe ...&gt;&lt;/iframe&gt;) <span className="text-destructive">*</span>
                </label>
                <textarea
                  rows={5}
                  {...register('videoEmbedUrl', {
                    required: 'Video embed code is required',
                  })}
                  placeholder='<iframe width="560" height="315" src="https://www.youtube.com/embed/..." title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
                  className="w-full rounded-xl border border-border bg-background p-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary font-mono leading-relaxed"
                />
                {errors.videoEmbedUrl && (
                  <span className="text-[11px] text-destructive mt-1 block">
                    {errors.videoEmbedUrl.message}
                  </span>
                )}
                <div className="mt-1.5 flex items-start gap-1.5 text-[11px] text-muted-foreground">
                  <HelpCircle className="h-3.5 w-3.5 shrink-0 mt-0.5 text-primary" />
                  <span>
                    You can paste any embed code with <code>&lt;iframe&gt;</code> directly from YouTube (Share &gt; Embed), Facebook Video Embed code, Vimeo, or any other video hosting provider.
                  </span>
                </div>
              </div>

              <div>
                <input type="hidden" {...register('videoThumbnail')} />
                <ImageUploader
                  label="Video Cover Thumbnail (Optional)"
                  value={watch('videoThumbnail')}
                  onChange={(url) =>
                    setValue('videoThumbnail', url, {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }
                  required={false}
                  helperText="Optional cover image to show on the homepage before the user clicks to watch."
                  aspectRatio="video"
                />
              </div>
            </div>

            {/* Live Video Embed Preview Frame */}
            <div className="lg:col-span-6">
              <label className="block text-xs font-bold text-foreground mb-1.5">
                Live Embed Player Preview
              </label>
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-black shadow-inner flex items-center justify-center">
                {rawVideoInput ? (
                  <EmbedVideoPlayer embedCode={rawVideoInput} />
                ) : (
                  <div className="flex flex-col items-center justify-center p-6 text-center text-muted-foreground">
                    <Play className="h-10 w-10 text-muted-foreground/40 mb-2" />
                    <p className="font-serif text-xs font-bold">No embed code entered</p>
                    <p className="text-[11px] text-muted-foreground">
                      Paste an iframe embed code on the left to preview the video player here.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Narrative & Headings */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 border-b border-border/70 pb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h2 className="font-serif text-base font-bold text-foreground">
                College Narrative & Story
              </h2>
              <p className="text-xs text-muted-foreground">
                Primary headings and history descriptions displayed across homepage and about pages.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-foreground mb-1.5">
                Main Heading <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                {...register('heading', { required: 'Heading is required' })}
                placeholder="40+ Years of Academic Excellence in Nabiganj"
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary font-serif font-bold"
              />
              {errors.heading && (
                <span className="text-[11px] text-destructive mt-1 block">
                  {errors.heading.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1.5">
                Subheading / Tagline <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                {...register('subheading', { required: 'Subheading is required' })}
                placeholder="Empowering generations through quality education, discipline, and integrity since 1984."
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              {errors.subheading && (
                <span className="text-[11px] text-destructive mt-1 block">
                  {errors.subheading.message}
                </span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-foreground mb-1.5">
              Historical Overview (Paragraph 1) <span className="text-destructive">*</span>
            </label>
            <textarea
              rows={4}
              {...register('description1', {
                required: 'Description paragraph 1 is required',
              })}
              placeholder="Origins, foundation history, and regional importance of Nabiganj Government College..."
              className="w-full rounded-xl border border-border bg-background p-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary leading-relaxed"
            />
            {errors.description1 && (
              <span className="text-[11px] text-destructive mt-1 block">
                {errors.description1.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-foreground mb-1.5">
              Academic Facilities & Leadership (Paragraph 2) <span className="text-destructive">*</span>
            </label>
            <textarea
              rows={4}
              {...register('description2', {
                required: 'Description paragraph 2 is required',
              })}
              placeholder="Laboratories, computerized library, BCS cadre faculty, and future outlook..."
              className="w-full rounded-xl border border-border bg-background p-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary leading-relaxed"
            />
            {errors.description2 && (
              <span className="text-[11px] text-destructive mt-1 block">
                {errors.description2.message}
              </span>
            )}
          </div>
        </div>

        {/* Section 3: 3 Core Pillars (Mission, Vision, Values) */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 border-b border-border/70 pb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Target className="h-4 w-4" />
            </div>
            <div>
              <h2 className="font-serif text-base font-bold text-foreground">
                Core Pillars (Mission, Vision & Values)
              </h2>
              <p className="text-xs text-muted-foreground">
                Institutional commitments showcased across the homepage and profile section.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {/* Mission */}
            <div className="rounded-xl border border-border/80 bg-secondary/20 p-4 space-y-2">
              <div className="flex items-center gap-2 text-primary">
                <Target className="h-4 w-4" />
                <span className="font-serif text-xs font-bold uppercase tracking-wider text-foreground">
                  Our Mission
                </span>
              </div>
              <textarea
                rows={3}
                {...register('missionText', { required: 'Mission is required' })}
                placeholder="Institutional mission statement..."
                className="w-full rounded-lg border border-border bg-background p-2.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary leading-relaxed"
              />
              {errors.missionText && (
                <span className="text-[11px] text-destructive mt-1 block">
                  {errors.missionText.message}
                </span>
              )}
            </div>

            {/* Vision */}
            <div className="rounded-xl border border-border/80 bg-secondary/20 p-4 space-y-2">
              <div className="flex items-center gap-2 text-primary">
                <Eye className="h-4 w-4" />
                <span className="font-serif text-xs font-bold uppercase tracking-wider text-foreground">
                  Our Vision
                </span>
              </div>
              <textarea
                rows={3}
                {...register('visionText', { required: 'Vision is required' })}
                placeholder="Institutional vision statement..."
                className="w-full rounded-lg border border-border bg-background p-2.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary leading-relaxed"
              />
              {errors.visionText && (
                <span className="text-[11px] text-destructive mt-1 block">
                  {errors.visionText.message}
                </span>
              )}
            </div>

            {/* Values */}
            <div className="rounded-xl border border-border/80 bg-secondary/20 p-4 space-y-2">
              <div className="flex items-center gap-2 text-primary">
                <Heart className="h-4 w-4" />
                <span className="font-serif text-xs font-bold uppercase tracking-wider text-foreground">
                  Core Values
                </span>
              </div>
              <textarea
                rows={3}
                {...register('valuesText', { required: 'Values are required' })}
                placeholder="Institutional core values..."
                className="w-full rounded-lg border border-border bg-background p-2.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary leading-relaxed"
              />
              {errors.valuesText && (
                <span className="text-[11px] text-destructive mt-1 block">
                  {errors.valuesText.message}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Section 4: Official Institutional Identifiers */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 border-b border-border/70 pb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Building2 className="h-4 w-4" />
            </div>
            <div>
              <h2 className="font-serif text-base font-bold text-foreground">
                Government & Educational Identifiers
              </h2>
              <p className="text-xs text-muted-foreground">
                Official codes recognized by BISE Sylhet, Ministry of Education, and National University.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="block text-xs font-bold text-foreground mb-1.5">
                Established Year <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                {...register('establishedYear', { required: 'Established year is required' })}
                placeholder="1984"
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1.5">
                EIIN Number <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                {...register('eiinNumber', { required: 'EIIN is required' })}
                placeholder="129524"
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1.5">
                College Code (BISE) <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                {...register('collegeCode', { required: 'College Code is required' })}
                placeholder="1301"
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1.5">
                National Univ. Code <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                {...register('nuCode', { required: 'NU Code is required' })}
                placeholder="1706"
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary font-bold"
              />
            </div>
          </div>
        </div>

        {/* Submit Floating Bottom Bar */}
        <div className="sticky bottom-6 z-20 flex items-center justify-between rounded-2xl border border-border/80 bg-card/95 p-4 shadow-xl backdrop-blur-md">
          <div className="text-xs text-muted-foreground">
            {isDirty ? (
              <span className="text-accent font-semibold">● You have unsaved changes</span>
            ) : (
              <span>All information is saved and synced with PostgreSQL.</span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-xs font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90 disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            <span>Save & Publish Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
};
