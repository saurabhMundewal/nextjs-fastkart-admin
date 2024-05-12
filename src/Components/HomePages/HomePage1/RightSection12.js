import React, { useContext, useState } from "react";
import SimpleInputField from "../../InputFields/SimpleInputField";
import CheckBoxField from "../../InputFields/CheckBoxField";
import { RiArrowDownLine } from "react-icons/ri";
import { useTranslation } from "react-i18next";
import FileUploadField from "../../InputFields/FileUploadField";
import SearchableSelectInput from '../../InputFields/SearchableSelectInput'
import { getHelperText } from "../../../Utils/CustomFunctions/getHelperText";

const RightSection12 = ({
  values,
  active,
  setActive,
  setFieldValue,
  productData,
  setSearch,
}) => {
  const { t } = useTranslation("common");
  return (
    <div className="shipping-accordion-custom">
      <div
        className="p-3 rule-dropdown d-flex justify-content-between"
        onClick={() => setActive(12)}
      >
        {values["content"]["main_content"]["section12_youtube"]["title"]}
        <RiArrowDownLine />
      </div>
      {active == 12 && (
        <div className="rule-edit-form">
          <SimpleInputField
            nameList={[
              {
                name: `[content][main_content][section12_youtube][title]`,
                placeholder: t("EnterTitle"),
                title: "Title",
              },
              {
                name: `[content][main_content][section12_youtube][youtubeID]`,
                placeholder: "YouTube ID",
                title: "YouTube ID",
              },
              {
                name: `[content][main_content][section12_youtube][description]`,
                placeholder: t("EnterDescription"),
                title: "Description",
                type: "textarea",
              },
            ]}
          />

          <FileUploadField
            name="MainBanner1"
            title="Main Image"
            id="MainBanner1"
            type="file"
            showImage={values["MainBanner1"]}
            values={values}
            setFieldValue={setFieldValue}
            helpertext={getHelperText("583x157px")}
          />

          <SearchableSelectInput
            nameList={[
              {
                name: "[content][main_content][section12_youtube][product1_id]",
                title: "Products",
                inputprops: {
                  name: "[content][main_content][section12_youtube][product1_id]",
                  id: "[content][main_content][section12_youtube][product1_id]",
                  options: productData || [],
                  setsearch: setSearch,
                },
              },
            ]}
          />

          <SearchableSelectInput
            nameList={[
              {
                name: "[content][main_content][section12_youtube][product2_id]",
                title: "Products",
                inputprops: {
                  name: "[content][main_content][section12_youtube][product2_id]",
                  id: "[content][main_content][section12_youtube][product2_id]",
                  options: productData || [],
                  setsearch: setSearch,
                },
              },
            ]}
          />

          <CheckBoxField
            name={`[content][main_content][section12_youtube][status]`}
            title="Status"
          />
        </div>
      )}
    </div>
  );
};

export default RightSection12;
