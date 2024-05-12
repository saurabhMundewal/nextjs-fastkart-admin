import { useTranslation } from "react-i18next";
import SearchableSelectInput from "../InputFields/SearchableSelectInput";
import SimpleInputField from "../InputFields/SimpleInputField";
import useCreate from "@/Utils/Hooks/useCreate";

  const EmailTab = ({ values ,setFieldValue  }) => { 
    const { mutate } = useCreate("notifications/test") 
    const handleNonSubmitButton = () => {
      setFieldValue("submitButtonClicked",true)
      values.submitButtonClicked &&  mutate(values.email)
    };
    const { t } = useTranslation( 'common');
    return (
      <>
        <SearchableSelectInput
          nameList={[
            {title: "Mailer",name: "mail_mailer",inputprops: {name: "mail_mailer",id: "mail_mailer",options: [{ id: "sendmail", name: "SendMail" },{ id: "smtp", name: "SMTP" },{ id: "mailgun", name: "MailGun" },],},},
          ]}
        />
        {
          values?.['mail_mailer'] == "mailgun" ?
            <SimpleInputField nameList={[{ name: "[values][email][mailgun_domain]", title: "MailgunDomain", placeholder: t("EnterMailGunDomain") },{ name: "[values][email][mailgun_secret]", title: "MailgunSecret", placeholder: t("EnterMailGunSecret") },]}/>
            :
            <>
              <SimpleInputField nameList={[{ name: "[values][email][mail_host]", title: "Host", placeholder: t("EnterMailHost") },{ name: "[values][email][mail_port]", title: "Port", placeholder: t("EnterMailPort"), type: "number" }]}/>
              <SearchableSelectInput
                nameList={[
                  {title: "Encryption",name: "mail_encryption",inputprops: {
                      name: "mail_encryption",
                      id: "mail_encryption",
                      options: [
                        { id: "ssl", name: "SSL" },
                        { id: "tls", name: "TLS" },
                      ],
                    },
                  },
                ]}
              />
              <SimpleInputField
                nameList={[
                  { name: "[values][email][mail_username]", title: "Username", placeholder: t("EnterMailUsername") },
                  { name: "[values][email][mail_password]", title: "Password", type: "password", placeholder: t("EnterMailPassword") },
                  { name: "[values][email][mail_from_name]", title: "MailFromName", placeholder: t("EnterMailFromName") },
                  { name: "[values][email][mail_from_address]", title: "MailFromAddress", placeholder: t("EnterMailFromAddress") },

                ]}
              />
            </>
        }
        <hr/>
        <h4 className="fw-semibold mb-3 txt-primary w-100">{t("Testemail")}</h4>
        <SimpleInputField nameList={[{ name: "email", title: "to_mail",type:"email", placeholder: t("enter_email") },]}/>
        <button
        type="button"
         title="SendEmail"
         className="btn btn-animation  ms-auto"
         onClick={handleNonSubmitButton}
                    >{t("SendEmail")}</button>
      </>
    );
  };

  export default EmailTab;
