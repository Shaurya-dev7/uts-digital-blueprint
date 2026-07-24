import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export function FounderSection() {
  return (
    <Section className="bg-navy overflow-hidden text-white">
      <ContainerScroll
        titleComponent={
          <>
            <h2 className="text-4xl font-semibold text-white mb-8">
              Meet Our <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none text-red-500">
                Founder
              </span>
            </h2>
          </>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center bg-[#1a2234] rounded-2xl p-8 md:p-12 border border-white/10">
          <div className="md:col-span-4 flex flex-col items-center text-center md:items-start md:text-left">
            <div className="w-48 h-48 md:w-full md:h-80 bg-gray-200 rounded-2xl overflow-hidden mb-6 relative border-4 border-white/10 shadow-xl group">
              <div 
                className="absolute inset-0 bg-cover bg-[center_top] transition-transform duration-700 group-hover:scale-105" 
                style={{ backgroundImage: 'url(/images/founder.jpg)' }} 
              />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">Rajesh Kumar Rai</h3>
            <p className="text-red-400 font-medium uppercase tracking-wider text-sm mb-4">Founder & Proprietor</p>
            
            <div className="text-gray-400 text-sm space-y-2 mt-2 w-full">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>Experience</span>
                <span className="text-white font-medium">15+ Years</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>Specialty</span>
                <span className="text-white font-medium">Industrial Sales</span>
              </div>
              <div className="flex justify-between pb-2">
                <span>Role</span>
                <span className="text-white font-medium">Commercial Ops</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-8 md:pl-8 border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0">
            <svg aria-hidden="true" className="w-12 h-12 text-white/10 mb-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            
            <p className="text-xl md:text-2xl leading-relaxed text-gray-300 font-light mb-8">
              "When I started UTS in 2013, I recognized a critical gap in the market: companies didn't just need suppliers; they needed highly technical partners who understood their operations. 
              <br/><br/>
              Our growth isn't measured in revenue, it is measured by the trust of the plant engineers, procurement managers, and business leaders who rely on us every single day. We don't compromise on quality, because in heavy industry, quality is synonymous with safety."
            </p>

            <div className="flex justify-end">
              <div className="w-48 h-16 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center opacity-80">
                <span className="font-serif italic text-2xl text-gray-400">Rajesh K. Rai</span>
              </div>
            </div>
          </div>
        </div>
      </ContainerScroll>
    </Section>
  );
}
