import React, { useState } from 'react'
import TabTitle from '@/Components/Widgets/TabTitle';
import { TabContent, TabPane } from 'reactstrap'
import { ThemeOneHomeHorizontalTab } from '../../../Data/TabTitleListData';
import FileUploadField from '../../InputFields/FileUploadField';
import { getHelperText } from '../../../Utils/CustomFunctions/getHelperText';
import CommonRedirect from '../CommonRedirect';

const HomeMobileBannerTab = ({ values, setFieldValue, productData, categoryData, setSearch }) => {
    const [activeTab, setActiveTab] = useState("1");
    return (
        <div className="inside-horizontal-tabs">
            <TabTitle activeTab={activeTab} setActiveTab={setActiveTab} titleList={ThemeOneHomeHorizontalTab} />
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <FileUploadField name="homeMobileBannerMainImage" title='Image' id="homeMobileBannerMainImage" showImage={values['homeMobileBannerMainImage']} type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('1155x670px')} />
                    
                </TabPane>
                <TabPane tabId="2">
                    <FileUploadField name="homeMobileBannerSubBanner1Image" title='Image' id="homeMobileBannerSubBanner1Image" showImage={values['homeMobileBannerSubBanner1Image']} type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('415x320px')} />
                    
                </TabPane>
                <TabPane tabId="3">
                    <FileUploadField name="homeMobileBannerSubBanner2Image" title='Image' id="homeMobileBannerSubBanner2Image" showImage={values['homeMobileBannerSubBanner2Image']} type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('415x320px')} />
                    
                </TabPane>
            </TabContent>
        </div>
    )
}

export default HomeMobileBannerTab