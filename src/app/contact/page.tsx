
"use client";

import ContactForm from "@/components/custom/contactForm/ContactForm";
import MainContentContainer from "@/components/custom/mainContent/MainContentContainer";

export default function Contact() {

  return (
    <MainContentContainer loading={false} error={null}>
      <div className="flex items-center justify-center">
        {/* <p>dfljfl</p> */}
        <ContactForm />
      </div>
    </MainContentContainer>
  );
}

