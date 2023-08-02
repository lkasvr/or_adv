import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

interface ISendEmail<Template> {
  templateID: string;
  templateParams: Template;
  success: (res: EmailJSResponseStatus) => void;
  error: (error: EmailJSResponseStatus) => void;
}

const sendEmail = <Template extends Record<string, unknown> | undefined>({
  templateID,
  templateParams,
  success,
  error,
}: ISendEmail<Template>) => {
  emailjs
    .send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? '',
      templateID,
      templateParams,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLICKEY ?? '',
    )
    .then(success, error);
};

export default sendEmail;
