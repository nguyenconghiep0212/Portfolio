import { http } from "/@/utils/axios";

export const sendMail = (mail: {
  company: string;
  companyUrl: string;
  content: string;
}) => {
  return http.post(
    { url: "/api/mail/send-mail", data: mail },
    { isTransformResponse: false, joinParamsToUrl: false }
  );
};
