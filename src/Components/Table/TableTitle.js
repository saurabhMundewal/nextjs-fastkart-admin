import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import { usePathname, useRouter } from "next/navigation";
import useCreate from "../../Utils/Hooks/useCreate";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import Btn from "../../Elements/Buttons/Btn";
import Pluralize from "../../Utils/CustomFunctions/Pluralize";
import NoSsr from "../../Utils/HOC/NoSsr";
import usePermissionCheck from "../../Utils/Hooks/usePermissionCheck";
import ImportExport from "./ImportExport";
import {
  RiDownload2Line,
  RiUpload2Line,
  RiUploadCloud2Line,
} from "react-icons/ri";
import {
  YupObject,
  requiredSchema,
} from "../../Utils/Validation/ValidationSchemas";
import { TabContent, TabPane } from "reactstrap";
import ShowModal from "../../Elements/Alerts&Modals/Modal";
import FileUploadBrowser from "../InputFields/FileUploadBrowser";
import ProductUpdateExportAPI from "../../Utils/AxiosUtils/API";

const TableTitle = ({
  fullObj,
  moduleName,
  onlyTitle,
  type,
  filterHeader,
  importExport,
  refetch,
  exportButton,
  showFilterDifferentPlace,
}) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const pathname = usePathname();
  const [create] = usePermissionCheck(["create"]);
  const [file, setFile] = useState(null);
  const [modal, setModal] = useState(false);
  const [hideFile, setHideFile] = useState(false);
  const [updateVariation, setUpdateVariation] = useState(false);

  const { mutate: importMutate, isLoading: exportLoader } = useCreate(
    "/exportUpdateProducts",
    false,
    false,
    false,
    (resDta) => {
      if (resDta?.status === 200 || resDta?.status === 201) {
        const blob = new Blob([resDta?.data], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${moduleName.toLowerCase()}.csv`;
        link.click();
        window.URL.revokeObjectURL(url);
      }
    },
    false,
    "blob"
  );

  const { mutate: exportVariation, isLoading: exportVariationLoader } =
    useCreate(
      "/exportUpdateVariation",
      false,
      false,
      false,
      (resDta) => {
        if (resDta?.status === 200 || resDta?.status === 201) {
          const blob = new Blob([resDta?.data], { type: "text/csv" });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `${moduleName.toLowerCase()}.csv`;
          link.click();
          window.URL.revokeObjectURL(url);
        }
      },
      false,
      "blob"
    );

  const { mutate, isLoading } = useCreate(
    "/importUpdateProducts",
    false,
    false,
    `${moduleName} added successfully`,
    (resData) => {
      if (resData?.status === 200 || resData?.status === 201) {
        refetch();
        setModal(false);
        setHideFile(true);
        setUpdateVariation(false);
      }
    }
  );

  const { mutate: importVariation, isLoadingVariation } = useCreate(
    "/importUpdateVariation",
    false,
    false,
    `${moduleName} added successfully`,
    (resData) => {
      if (resData?.status === 200 || resData?.status === 201) {
        refetch();
        setModal(false);
        setHideFile(false);
      }
    }
  );

  const handleImportClick = () => {
    importMutate(); // Triggers the export API call
  };

  return (
    <div className="title-header option-title">
      <h5>
        {filterHeader?.customTitle
          ? t(filterHeader?.customTitle)
          : t(Pluralize(moduleName))}
      </h5>
      {importExport && (
        <ImportExport
          importExport={importExport}
          moduleName={Pluralize(moduleName)}
          refetch={refetch}
          exportButton={exportButton}
        />
      )}

      {moduleName === "Product" ? (
        <button
          onClick={() => handleImportClick()}
          className="btn-outline btn btn-secondary"
        >
          {t("Export Update")}
        </button>
      ) : null}

      {moduleName === "Product" ? (
        <button
          onClick={() => {
            setModal(true);
            setUpdateVariation(false);
          }}
          className="btn-outline btn btn-secondary"
        >
          {t("Import Update")}
        </button>
      ) : null}

      {moduleName === "Product" ? (
        <button
          onClick={() => {
            setModal(true); // Set the `modal` state
            setUpdateVariation(true); // Set the other state
          }}
          className="btn-outline btn btn-secondary"
        >
          {t("Update variation")}
        </button>
      ) : null}

      <NoSsr>
        {filterHeader?.customFilter &&
          !showFilterDifferentPlace &&
          filterHeader?.customFilter}
        {create && !onlyTitle && (
          <Btn
            className="align-items-center btn-theme add-button"
            title={t("Add") + " " + t(moduleName)}
            onClick={() =>
              type == "post" && moduleName.toLowerCase() == "tag"
                ? router.push(`/${pathname.split("/")[1]}/tag/create`)
                : type == "post"
                ? router.push(`/${pathname.split("/")[1]}/category/create`)
                : router.push(`/${pathname.split("/")[1]}/create`)
            }
          >
            <FiPlus />
          </Btn>
        )}
      </NoSsr>

      <ShowModal
        open={modal}
        setModal={setModal}
        modalAttr={{
          className:
            "import-export-modal media-modal inset-media-modal modal-dialog modal-dialog-centered modal-xl",
        }}
        close={true}
        title={"InsertMedia"}
        noClass={true}
      >
        <TabContent>
          <Formik
            initialValues={{ product: "" }}
            validationSchema={YupObject({
              product: requiredSchema,
            })}
            onSubmit={(values, { resetForm }) => {
              let formData = new FormData();
              Object.values(values["product"]).forEach((el) => {
                if (el) {
                  formData.append("product", el);
                }
              });
              if (updateVariation) {
                importVariation(formData);
              } else {
                mutate(formData);
              }
            }}
          >
            {({ values, setFieldValue, errors, handleSubmit }) => (
              <form
                className="theme-form theme-form-2 mega-form"
                onSubmit={handleSubmit}
              >
                <TabPane className={"fade active show"} id="select">
                  <div className="content-section drop-files-sec mb-2">
                    <div>
                      <RiUploadCloud2Line />
                      <div>
                        <div className="dflex-wgap justify-content-center ms-auto save-back-button">
                          <h2>
                            {t("Dropfilesherepaste")}
                            <span>{t("or")}</span>
                            <FileUploadBrowser
                              errors={errors}
                              id="product"
                              name="product"
                              type="file"
                              multiple={true}
                              values={values}
                              setFieldValue={setFieldValue}
                              accept=".csv"
                            />
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                  {hideFile ? (
                    <p>
                      {t("downloadExampleCSV")}
                      <a
                        className="ms-2"
                        href={`/assets/csv/${importExport?.sampleFile}`}
                        download={importExport?.sampleFile}
                      >
                        {t(
                          importExport?.sampleFile?.includes("csv")
                            ? "Here"
                            : "ReadTheInstructions"
                        )}
                      </a>
                      {importExport?.instructionsAndSampleFile && (
                        <>
                          {t("and_please_ensure_you")}
                          <a
                            href={`/assets/csv/${importExport?.sampleFile}`}
                            download={importExport?.instructions}
                          >
                            {" "}
                            {t("read_the_instructions")}{" "}
                          </a>
                        </>
                      )}
                    </p>
                  ) : null}
                </TabPane>
                <div className="modal-footer">
                  {values[moduleName.toLowerCase()] &&
                    values[moduleName.toLowerCase()]?.length > 0 && (
                      <a
                        href="#javascript"
                        onClick={() => setFieldValue(`${moduleName}`, "")}
                      >
                        {t("Clear")}
                      </a>
                    )}
                  {updateVariation ? (
                    <button
                      onClick={() => exportVariation()}
                      className="btn-outline btn btn-secondary margin-0"
                    >
                      {t("Import variation")}
                    </button>
                  ) : null}
                  <Btn
                    type="submit"
                    className="btn-theme ms-auto"
                    title="Insert Media"
                    loading={Number(isLoading)}
                  />
                </div>
              </form>
            )}
          </Formik>
        </TabContent>
      </ShowModal>
    </div>
  );
};

export default TableTitle;
