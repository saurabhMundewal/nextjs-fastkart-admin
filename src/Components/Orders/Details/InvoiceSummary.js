import React, { useContext, useState } from 'react'
import Link from 'next/link'
import { Card, CardBody } from 'reactstrap'

import SettingContext from '@/Helper/SettingContext'
import { useTranslation } from "react-i18next";
import Btn from '@/Elements/Buttons/Btn'
import ReceiptModal from './ReceiptModal'


const InvoiceSummary = ({ data }) => {
    
    const { t } = useTranslation( 'common');
    console.log(data, 'data on invoice summary')
    const { convertCurrency } = useContext(SettingContext)
    const [ openReceiptModal, setOpenReceiptModal ] = useState(false);
    return (
        <Card>
            <CardBody>
                <div className="title-header" >
                    <div className="d-flex align-items-center">
                        <h5>{("Summary")}</h5>
                    </div>
                    {data?.invoice_url && <div className='d-flex gap-2'> 
                        <Btn  className="btn-animation btn-sm ms-auto btn-outline" onClick={() => setOpenReceiptModal(true)}>{t("Receipt")}</Btn>
                         <Link href={data?.invoice_url?.replace('https://apis.vector-x.com/', 'https://apis.vector-x.com/api/')} className="btn btn-animation btn-sm ">{t("Invoice")}</Link></div>}
                </div>
                <div className="tracking-total tracking-wrapper">
                    <ul>
                        <li>{t("Subtotal")} :<span>{convertCurrency(data?.amount)}</span></li>
                        {!data?.is_digital_only &&
                            <li>{t("Shipping")} :<span>{convertCurrency(data?.shipping_total ?? 0)}</span></li>
                        }
                        <li>{t("Tax")} :<span>{convertCurrency(data?.tax_total ?? 0)}</span></li>
                        {data?.points_amount ? <li className="txt-primary fw-bold">{t("Points")} <span>{convertCurrency(data?.points_amount)}</span></li> : ""}
                        {data?.wallet_balance ? <li className="txt-primary fw-bold">{t("WalletBalance")} <span>{convertCurrency(data?.wallet_balance)}</span></li> : ""}
                        {data?.coupon_total_discount != 0 ? <li className="txt-primary fw-bold">{t("discount")} <span>{convertCurrency(data?.coupon_total_discount)}</span></li> : ""}
                        <li>{t("Total")} <span>{convertCurrency(data?.total ?? 0)}</span></li>
                    </ul>
                </div>
            </CardBody>
            {openReceiptModal && <ReceiptModal open={openReceiptModal} data={data} setOpen={setOpenReceiptModal} />}
        </Card >
    )
}

export default InvoiceSummary