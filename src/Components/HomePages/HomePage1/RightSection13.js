import { useContext } from 'react'
import { RiArrowDownLine } from 'react-icons/ri'
import CheckBoxField from '../../InputFields/CheckBoxField'
import SimpleInputField from '../../InputFields/SimpleInputField'
import SearchableSelectInput from '../../InputFields/SearchableSelectInput'
import { useTranslation } from "react-i18next";
import FileUploadField from '../../InputFields/FileUploadField'
import { getHelperText } from '../../../Utils/CustomFunctions/getHelperText'

const RightSection13 = ({ values, active, setActive,setFieldValue, productData, setSearch }) => {
    const { t } = useTranslation( 'common');
    return (
        <div className='shipping-accordion-custom'>
            <div className="p-3 rule-dropdown d-flex justify-content-between" onClick={() => setActive(13)}>{values['content']['main_content']['section13_360View']['title']}<RiArrowDownLine />
            </div>
            {active == 13 && (
                <div className="rule-edit-form">
                    <SimpleInputField nameList={[
                        { name: `[content][main_content][section13_360View][title]`, placeholder: t("EnterTitle"), title: "Title" }, { name: `[content][main_content][section13_360View][description]`, placeholder: t("EnterDescription"), title: "Description", type: "textarea" }
                    ]} />
                      <FileUploadField name="section131CategoryImage" title='Image' id="section131CategoryImage" type="file" values={values} setFieldValue={setFieldValue} showImage={values["section131CategoryImage"]} helpertext={getHelperText('153x157px')} />
                      <FileUploadField name="section132CategoryImage" title='Image' id="section132CategoryImage" type="file" values={values} setFieldValue={setFieldValue} showImage={values["section132CategoryImage"]} helpertext={getHelperText('153x157px')} />
                      <FileUploadField name="section133CategoryImage" title='Image' id="section133CategoryImage" type="file" values={values} setFieldValue={setFieldValue} showImage={values["section133CategoryImage"]} helpertext={getHelperText('153x157px')} />
                      <FileUploadField name="section134CategoryImage" title='Image' id="section134CategoryImage" type="file" values={values} setFieldValue={setFieldValue} showImage={values["section134CategoryImage"]} helpertext={getHelperText('153x157px')} />
                      <FileUploadField name="section135CategoryImage" title='Image' id="section135CategoryImage" type="file" values={values} setFieldValue={setFieldValue} showImage={values["section135CategoryImage"]} helpertext={getHelperText('153x157px')} />
                      <FileUploadField name="section136CategoryImage" title='Image' id="section136CategoryImage" type="file" values={values} setFieldValue={setFieldValue} showImage={values["section136CategoryImage"]} helpertext={getHelperText('153x157px')} />
                      <FileUploadField name="section137CategoryImage" title='Image' id="section137CategoryImage" type="file" values={values} setFieldValue={setFieldValue} showImage={values["section137CategoryImage"]} helpertext={getHelperText('153x157px')} />
                      <FileUploadField name="section138CategoryImage" title='Image' id="section138CategoryImage" type="file" values={values} setFieldValue={setFieldValue} showImage={values["section138CategoryImage"]} helpertext={getHelperText('153x157px')} />

                    <SearchableSelectInput
                        nameList={
                            [{
                                name: '[content][main_content][section13_360View][product_id]',
                                title: "Products",
                                inputprops: {
                                    name: '[content][main_content][section13_360View][product_id]',
                                    id: '[content][main_content][section13_360View][product_id]',
                                    options: productData || [],
                                    setsearch: setSearch,
                                }
                            },
                            ]}
                    />
                    <CheckBoxField name={`[content][main_content][section13_360View][status]`} title="Status" />
                </div>
            )}
        </div>
    )
}

export default RightSection13