/* WaitlistSignup section - Email capture form with success state */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { CheckCircle2, Lock } from 'lucide-react';

export default function WaitlistSignup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && role) {
      setSubmitted(true);
    }
  };

  return (
    <section
      id="waitlist"
      data-testid="waitlist-section"
      className="relative bg-[#0a0a0a] py-24 md:py-32 z-10 border-t border-white/5"
    >
      {/* Radial glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#EAFF00] opacity-[0.04] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-xl mx-auto text-center"
            >
              {/* Headline */}
              <h2
                data-testid="waitlist-headline"
                className="font-['Syne'] text-3xl md:text-5xl tracking-tight font-bold text-white mb-4"
              >
                Be First. Be <span className="text-[#EAFF00]">Seen.</span>
              </h2>
              <p className="text-[#a0a0a0] text-lg font-['Satoshi'] leading-relaxed mb-10">
                Join the CultGig waitlist and get early access when we launch.
                No spam. Just the good stuff.
              </p>

              {/* Form */}
              <form
                data-testid="waitlist-form"
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    data-testid="waitlist-name-input"
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-[#111111] border-white/20 rounded-lg h-12 px-4 text-white placeholder:text-[#666] focus-visible:ring-[#EAFF00] focus-visible:border-[#EAFF00] font-['Satoshi']"
                  />
                  <Input
                    data-testid="waitlist-email-input"
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-[#111111] border-white/20 rounded-lg h-12 px-4 text-white placeholder:text-[#666] focus-visible:ring-[#EAFF00] focus-visible:border-[#EAFF00] font-['Satoshi']"
                  />
                </div>

                <Select value={role} onValueChange={setRole} required>
                  <SelectTrigger
                    data-testid="waitlist-role-select"
                    className="bg-[#111111] border-white/20 rounded-lg h-12 px-4 text-white font-['Satoshi'] focus:ring-[#EAFF00] focus:border-[#EAFF00] [&>span]:text-[#666] data-[state=open]:border-[#EAFF00]"
                  >
                    <SelectValue placeholder="I'm a..." />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border border-[#EAFF00]/20 text-white">
                    <SelectItem
                      value="artist"
                      data-testid="waitlist-role-artist"
                      className="text-white hover:bg-[#EAFF00]/10 focus:bg-[#EAFF00]/10 focus:text-white font-['Satoshi']"
                    >
                      I'm an Artist / Creator
                    </SelectItem>
                    <SelectItem
                      value="business"
                      data-testid="waitlist-role-business"
                      className="text-white hover:bg-[#EAFF00]/10 focus:bg-[#EAFF00]/10 focus:text-white font-['Satoshi']"
                    >
                      I'm a Business / Venue
                    </SelectItem>
                  </SelectContent>
                </Select>

                <button
                  type="submit"
                  data-testid="waitlist-submit-button"
                  className="w-full bg-[#EAFF00] text-black font-bold py-4 rounded-lg text-base shadow-[0_0_20px_rgba(234,255,0,0.4)] hover:shadow-[0_0_40px_rgba(234,255,0,0.6)] hover:bg-[#d4e600] transition-all duration-300 font-['Satoshi']"
                >
                  Join the Waitlist
                </button>
              </form>

              {/* Privacy note */}
              <p className="flex items-center justify-center gap-2 text-sm text-[#666] mt-6 font-['Satoshi']">
                <Lock size={14} /> Your info is safe with us. No spam, ever.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              data-testid="waitlist-success-message"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="max-w-md mx-auto text-center py-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-20 h-20 rounded-full bg-[#EAFF00]/10 flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle2 size={40} className="text-[#EAFF00]" />
              </motion.div>
              <h3 className="font-['Syne'] text-3xl font-bold text-white mb-3">
                You're on the list!
              </h3>
              <p className="text-[#a0a0a0] text-lg font-['Satoshi']">
                We'll be in touch. Get ready to discover your next gig.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
