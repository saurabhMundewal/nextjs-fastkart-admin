import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { Card, CardBody, Input } from 'reactstrap';
import SettingContext from '@/Helper/SettingContext';
import { useTranslation } from "react-i18next";
import Btn from '@/Elements/Buttons/Btn';
import ReceiptModal from './ReceiptModal';
import { switchToDelhivery, moveToDelhiveryAPI } from '@/Utils/AxiosUtils/API';
import request from "@/Utils/AxiosUtils";
import { ToastNotification } from '@/Utils/CustomFunctions/ToastNotification';
import axios from 'axios';
import { useRouter } from "next/navigation";

const InvoiceSummary = ({ data }) => {
    const { t } = useTranslation('common');
    const router = useRouter();
    const { convertCurrency } = useContext(SettingContext);
    const [openReceiptModal, setOpenReceiptModal] = useState(false);
    const [addedField, setAddedField] = useState(false);
    const [formData, setFormData] = useState({
        parcelLength: 10,
        parcelBreadth: 10,
        parcelHeight: 10,
        parcelWeight: 10
    });

    const SHIPROCKET_API_URL = 'https://apiv2.shiprocket.in/v1/external';
    const SHIPROCKET_EMAIL = 'smundewal@gmail.com';
    const SHIPROCKET_PASSWORD = 'Saurabh@123';

    const getAuthToken = async () => {
        try {
            const response = await axios.post(`${SHIPROCKET_API_URL}/auth/login`, {
                email: SHIPROCKET_EMAIL,
                password: SHIPROCKET_PASSWORD,
            });
            return response.data.token;
        } catch (error) {
            throw new Error('Unable to authenticate with Shiprocket API');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const createOrder = async (token, orderDetails) => {
        const productDetail = orderDetails?.products?.map((product) => {
            return {
                "name": product?.name,
                "sku": product?.sku || 'default-sku',  // Replace with actual SKU or a default value
                "units": product?.units || 1,
                "selling_price": product?.selling_price || 0,
                "discount": product?.discount || 0,
                "tax": product?.tax || 0,
                "hsn": product?.hsn || 9876 // Replace with actual HSN or a default value
            };
        });
        const orderPayload = {
            "order_id": orderDetails?.id,
            "order_date": orderDetails?.created_at,
            "pickup_location": "Primary",
            "billing_customer_name": orderDetails?.consumer?.name,
            "billing_last_name": "",
            "billing_address": orderDetails?.billing_address?.street,
            "billing_address_2": orderDetails?.billing_address?.street,
            "billing_city": orderDetails?.billing_address?.city,
            "billing_pincode": orderDetails?.billing_address?.pincode,
            "billing_state": orderDetails?.billing_address?.state?.name,
            "billing_country": orderDetails?.billing_address?.country?.name,
            "billing_email": orderDetails?.consumer?.email,
            "billing_phone": orderDetails?.billing_address?.phone,
            "shipping_is_billing": true,
            "order_items": productDetail,
            "payment_method": orderDetails?.payment_method,
            "shipping_charges": orderDetails?.shipping_total,
            "giftwrap_charges": 0,
            "transaction_charges": 0,
            "total_discount": orderDetails?.discount,
            "sub_total": orderDetails?.total,
            "length": Number(formData.parcelLength),
            "breadth": Number(formData.parcelBreadth),
            "height": Number(formData.parcelHeight),
            "weight": Number(formData.parcelWeight)
        }
        try {
            const response = await axios.post(
                `${SHIPROCKET_API_URL}/orders/create/adhoc`,
                orderPayload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            throw new Error('Unable to create order');
        }
    };


    const moveToDelhivery = async (product) => {
        try {
            const token = await getAuthToken();
            const orderResponse = await createOrder(token, product);
            if (orderResponse) {
                const moveOrderResponse = await request({ url: `${moveToDelhiveryAPI}/${product?.id}/${product?.is_oneDelhivery}`, method: "put" });
                ToastNotification("success", 'Order has been moved successfully. Please check the Shiprocket dashboard.');
                setAddedField(false)
                setTimeout(() => {
                    router.push(`/order`);
                }, 10000);
            }

        } catch (error) {
            ToastNotification("error", 'Order is not moved, please try again', error.message);
        }
    };

    const handleSwitchDelhivery = async (productData) => {
        try {
            await moveToDelhivery(productData);
        } catch (error) {
            ToastNotification("error", 'Order is not moved, please try again', error.message);
        }
    };



    return (
        <Card>
            <CardBody>
                <div className="title-header">
                    <div className="d-flex align-items-center">
                        <h5>{t("Summary")}</h5>
                    </div>
                    {data?.is_oneDelhivery === 0 ? (
                        <Btn className="btn-animation btn-sm ms-auto btn-outline" onClick={() => setAddedField(true)}>
                            {t("Switch to Shiprocket")}
                        </Btn>
                    ) : null}
                    {data?.invoice_url && (
                        <div className='d-flex gap-2'>
                            <Btn className="btn-animation btn-sm ms-auto btn-outline" onClick={() => setOpenReceiptModal(true)}>
                                {t("Receipt")}
                            </Btn>
                            <Link href={data?.invoice_url.replace('https://apis.vector-x.com/', 'https://apis.vector-x.com/api/')} className="btn btn-animation btn-sm ">
                                {t("Invoice")}
                            </Link>
                        </div>
                    )}
                </div>
                {addedField && <div className="tracking-total tracking-wrapper">
                    <form>
                        <div>
                            <label htmlFor="parcelLength" className='mt-2'>Parcel Length:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="parcelLength"
                                name="parcelLength"
                                value={formData.parcelLength}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="parcelBreadth" className='mt-2'>Parcel Breadth:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="parcelBreadth"
                                name="parcelBreadth"
                                value={formData.parcelBreadth}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="parcelHeight" className='mt-2'>Parcel Height:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="parcelHeight"
                                name="parcelHeight"
                                value={formData.parcelHeight}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="parcelWeight" className='mt-2'>ParcelWeight:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="parcelWeight"
                                name="parcelWeight"
                                value={formData.parcelWeight}
                                onChange={handleChange}
                            />
                        </div>
                        <Btn className="btn-animation btn-sm ms-auto btn-outline mt-2 mb-2" onClick={() => handleSwitchDelhivery(data)}>
                            Submit
                        </Btn>
                    </form>
                </div>}
                <div className="tracking-total tracking-wrapper">
                    <ul>
                        <li>{t("Subtotal")} :<span>{convertCurrency(data?.amount)}</span></li>
                        {!data?.is_digital_only ? (
                            <li>{t("Shipping")} :<span>{convertCurrency(data?.shipping_total ?? 0)}</span></li>
                        ) : null}
                        {data?.points_amount ? <li className="txt-primary fw-bold">{t("Points")} <span>{convertCurrency(data?.points_amount)}</span></li> : null}
                        {data?.wallet_balance ? <li className="txt-primary fw-bold">{t("WalletBalance")} <span>{convertCurrency(data?.wallet_balance)}</span></li> : null}
                        {data?.coupon_total_discount !== 0 ? <li className="txt-primary fw-bold">{t("discount")} <span>{convertCurrency(data?.coupon_total_discount)}</span></li> : null}
                        <li>{t("Total")} <span>{convertCurrency(data?.total - data?.tax_total ?? 0)}</span></li>
                    </ul>
                </div>
            </CardBody>
            {openReceiptModal && <ReceiptModal open={openReceiptModal} data={data} setOpen={setOpenReceiptModal} />}
        </Card>
    );
};

export default InvoiceSummary;
