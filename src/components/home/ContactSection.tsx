import React from 'react';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import ContactForm from '../shared/ContactForm';

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="border-t border-border/70 bg-secondary/30 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left Column: Contact Details */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
              Get in Touch
            </span>
            <h2 className="mt-1 font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Have Questions? We&apos;re Here to Help
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Whether you&apos;re a prospective student, parent, or community
              member, we welcome your inquiries. Reach out to us through any of
              the channels below or send us a message.
            </p>

            {/* Channels List */}
            <div className="mt-8 space-y-5">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground sm:text-base">
                    Phone Numbers
                  </h3>
                  <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
                    <a
                      href="tel:01777262980"
                      className="hover:text-primary transition-colors"
                    >
                      01777262980
                    </a>
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground sm:text-base">
                    Email Address
                  </h3>
                  <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
                    <a
                      href="mailto:info@ngc.edu.bd"
                      className="hover:text-primary transition-colors"
                    >
                      info@ngc.edu.bd
                    </a>
                  </p>
                </div>
              </div>

              {/* Address & Google Maps Embed Card */}
              <div className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-xs transition-all hover:border-primary/40">
                {/* Location Card Header */}
                <div className="flex items-center justify-between border-b border-border/60 bg-secondary/40 px-4 py-3 sm:px-5">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-foreground sm:text-sm">
                        College Location
                      </h4>
                      <p className="text-[11px] text-muted-foreground">
                        Nabiganj, Habiganj, Sylhet
                      </p>
                    </div>
                  </div>

                  <a
                    href="https://maps.google.com/?q=Nabiganj+Govt.+College"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2.5 py-1 text-[11px] font-medium text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    <span>View Larger</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                {/* Responsive Map Frame */}
                <div className="relative h-[220px] w-full sm:h-[260px] lg:h-[280px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3627.985490420268!2d91.51833357481797!3d24.589696956039635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37513ff456a02663%3A0xd7c04a6c937aef24!2zTmFiaWdhbmogR292dC4gQ29sbGVnZSAtIOCmqOCmrOCngOCml-CmnuCnjeCmnCDgprjgprDgppXgpr7gprDgpr8g4KaV4Kay4KeH4Kac!5e0!3m2!1sen!2sbd!4v1787648541620!5m2!1sen!2sbd"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    className="block h-full w-full"
                    title="Nabiganj Government College Location Map"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form Box */}
          <div className="h-fit rounded-2xl border border-border bg-card p-6 shadow-xs sm:p-8">
            <h3 className="mb-4 font-serif text-xl font-bold text-foreground sm:text-2xl">
              Send Us a Message
            </h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
