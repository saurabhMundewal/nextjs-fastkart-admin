import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import request from '../../../Utils/AxiosUtils';
import { OrderAPI, OrderStatusAPI } from '../../../Utils/AxiosUtils/API';
import useCreate from '../../../Utils/Hooks/useCreate';
import usePermissionCheck from '../../../Utils/Hooks/usePermissionCheck';
import Loader from '../../CommonComponent/Loader';
import OrderDetailsTable from './OrderDetailsTable';
import OrderNumberTable from './OrderNumberTable';
import RightSidebar from './RightSidebar';
import TrackingPanel from './TrackingPanel';
import { useTranslation } from "react-i18next";

const OrderDetailsContain = ({ updateId }) => {

    const { t } = useTranslation('common');
    const [edit] = usePermissionCheck(["edit"]);
    const [orderStatus, setOrderStatus] = useState("")

    // Getting Data from Order API for Order_Number
    const { data, isLoading, refetch } = useQuery(["category/" + updateId], () => request({ url: `${OrderAPI}/${updateId}` }), { refetchOnWindowFocus: false, select: (res) => { return res.data } });

    // Getting Data from Order Status API
    const { data: orderStatusData, refetch: orderStatusRefetch, isLoading: orderStatusLoader } = useQuery([OrderStatusAPI], () => request({ url: OrderStatusAPI }), { enabled: false, refetchOnWindowFocus: false, select: (data) => data?.data?.data });

    // Update Status in Order API
    const { data: orderStatusUpdate, mutate } = useCreate(OrderAPI, data?.id, false, "No");

    useEffect(() => {
        if (data) {
            setOrderStatus(data?.order_status)
        }
    }, [isLoading])

    useEffect(() => {
        refetch()
        orderStatusRefetch()
    }, [])
    if (isLoading || orderStatusLoader) return <Loader />;
    return (
        <Row className='pb-4'>
            <Col xxl="9">
                {!data?.sub_orders?.length > 0 && <div className="mb-4">
                    {data?.is_oneDelhivery === 0 ?
                        <div className="tracking-panel">
                            <TrackingPanel order={data} orderStatusData={orderStatusData} orderStatus={orderStatus} mutate={mutate} />
                        </div> : <h5 className='bold'>Order has been moved to Shiprocket. Please check the order status on the Shiprocket dashboard.</h5>}
                </div>}
                <Col sm="12">
                    <OrderNumberTable refetch={refetch} moduleName={`${t('OrderNumber')}: #${data?.order_number}`} data={data} orderStatusData={orderStatusData} setOrderStatus={setOrderStatus} orderStatus={orderStatus} mutate={mutate} orderStatusUpdate={orderStatusUpdate} edit={edit} />
                </Col>
                {data?.sub_orders?.length > 0 &&
                    <Col sm="12">
                        <OrderDetailsTable moduleName={`OrderDetails`} data={data} />
                    </Col>
                }
            </Col >
            <Col xxl="3">
                <RightSidebar data={data} />
            </Col>
        </Row >
    )
}

export default OrderDetailsContain