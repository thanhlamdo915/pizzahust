import React, {memo, useEffect, useState} from "react";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {Header} from "../component/Header";
import {IC_ALL_ORDERS, IC_BENEFIT, IMG_BACKGROUND_STATISTIC} from "../assets";
import {Typography} from "@mui/material";
import {CustomPagination} from "../component/ManageCategory";
import {OrderDetail} from "../component/OrderDetail";

export const OrderStatistic = memo(function OrderStatistic() {
    const [OrderLists, setOrderLists] = useState([]);
    // const keys = Object.keys(OrderLists)
    const [keys, setKeys] = useState([])
    const maxrow = 9;
    const totalPage = Math.ceil(keys.length / maxrow);
    const [page, setPage] = useState(1);
    const [orderStart, setOrderStart] = useState(0);
    const [orderEnd, setOrderEnd] = useState(8);
    const [detailItem, setDetailItem] = useState(keys[0])
    const [status, setStatus] = useState('')
    const OrderList = keys.slice(orderStart, orderEnd + 1)
    useEffect(() => {
        async function fetchOrderLists() {
            const requestUrl = 'https://pizzahust-c5035-default-rtdb.firebaseio.com/order.json';
            const response = await fetch(requestUrl);
            const responseJSON = await response.json();
            setOrderLists(responseJSON);
        }

        fetchOrderLists().then();
    }, [])
    let totalpay = 0;
    let totaldish = 0;
    let totalcustomer = Object.values(OrderLists).length;
    let numStore = 0;

    Object.values(OrderLists).forEach(order => {
        totalpay += order['total payment'];
        const detail = order.detail;
        for (var pizza in detail) {
            totaldish += detail[pizza].length;
        }
        if (order['address'] =="Đặt tại quán") {
            numStore++;
        }
    });
    totalpay /= 1000;

    useEffect(() => {
        async function fetchOrderLists() {
            const requestUrl = 'https://pizzahust-c5035-default-rtdb.firebaseio.com/order.json';//'https://pizzahust-d7124-default-rtdb.asia-southeast1.firebasedatabase.app/order.json';
            const response = await fetch(requestUrl);
            const responseJSON = await response.json();

            setOrderLists(responseJSON);
            const keys = Object.keys(responseJSON).reverse();
            console.log(responseJSON);
            setKeys(keys);
            setDetailItem(keys[0]);
            setStatus(responseJSON[keys[0]].status)

        }

        fetchOrderLists();
    }, [])


    return (
        <Container>
            <Header/>
            <BackgroundMenu>ORDER STATISTIC</BackgroundMenu>
            <div style={{padding:'20px 60px'}}>

            <RowSection>
                <ContentBox>
                    <div style={{marginRight: 24}}>
                        <NumberText>{`${totalpay} K`}</NumberText>
                        <br/>
                        <ContentText>Doanh thu</ContentText>
                    </div>
                    <BenefitImg src={IC_BENEFIT}/>
                </ContentBox>
                <ContentBoxWhite>
                    <div style={{width: '50%', padding: '12px 32px'}}>
                        <NumberText>{`${numStore/totalcustomer * 100}%`}</NumberText>
                        <br/>
                        <ContentText>Tại quán</ContentText>
                    </div>
                    {/*<ThoiImg src={IC_THOI}/>*/}
                    <div style={{
                        width: '50%',
                        height: '100%',
                        backgroundColor: 'white',
                        padding: '12px 32px',
                        borderRadius: 16
                    }}>
                        <NumberText style={{color: '#ec393e'}}>{`${(1-numStore/totalcustomer) * 100}%`}</NumberText>
                        <br/>
                        <ContentText style={{color: '#ec393e', fontSize: 20}}>Giao hàng</ContentText>
                    </div>
                </ContentBoxWhite>
                <ContentBox style={{backgroundColor: 'white'}}>
                    <img style={{height: 80}} src={IC_ALL_ORDERS}/>
                    <div style={{
                        marginLeft: 24,
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}>
                        <NumberText style={{color: '#ec393e'}}>{`${totaldish}`}</NumberText>
                        <br/>
                        <ContentText style={{color: '#ec393e'}}>Tổng món</ContentText>
                    </div>
                </ContentBox>
            </RowSection>

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop:40
            }
            }>
                <Box sx={{
                    width: '750px',
                    padding: '0 0 20px 0',

                    backgroundColor: 'rgba(252, 237, 227, 0.3)',
                    borderRadius: '8px',
                    minHeight: '750px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                }}>
                    <Box><Box sx={{
                        padding: '33px 24px'
                    }}>
                        <Typography variant="h2"
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: '30px',
                                        justifyContent: 'left',
                                        textAlign: 'center',
                                    }}>
                            Thông tin đơn hàng
                        </Typography>

                    </Box>
                        <Box>
                            <table style={{
                                width: '100%'
                            }}>
                                <tr style={{
                                    borderBottom: ' 1px solid white',
                                }}>
                                    <th className='th-Order' style={{
                                        width: '30%',
                                        paddingLeft: '20px'
                                    }}>ID
                                    </th>
                                    <th className='th-Order' style={{
                                        width: '20%',
                                        paddingLeft: '20px'
                                    }}>Khách hàng
                                    </th>
                                    <th className='th-Order' style={{
                                        width: '20%',
                                        textAlign: 'center'
                                    }}>Thời gian
                                    </th>
                                    <th className='th-Order' style={{
                                        width: '15%'
                                    }}>Tổng Đơn
                                    </th>
                                    <th className='th-Order' style={{
                                        width: '15%',
                                    }}>Trạng Thái
                                    </th>
                                </tr>
                                {OrderList.map((order, index) => {

                                    //var key = Object.keys(OrderLists[order].detail);

                                    const day = new Date();
                                    day.setTime(OrderLists[order].time);
                                    let date = day.getDate();
                                    let month = day.getMonth();
                                    let year = day.getFullYear();
                                    let hour = day.getHours();
                                    let minute = day.getMinutes();
                                    return (
                                        <tr className="Order"
                                            tabIndex="0"
                                            style={{
                                                cursor: 'pointer',
                                            }}
                                            onClick={() => {
                                                setDetailItem(order);
                                                setStatus(OrderLists[order].status)
                                            }}>
                                            <td style={{paddingLeft: '10px'}}>{order}</td>
                                            <td style={{paddingLeft: '10px'}}>{OrderLists[order].customer}</td>
                                            <td style={{textAlign: 'center'}}>{`${hour}:${minute} ${date}/${month}/${year}`}</td>
                                            <td>{OrderLists[order]['total payment']}</td>
                                            <td>
                                                <button className={OrderLists[order].status} style={{
                                                    width: '91px',
                                                    height: '26px',
                                                    lineHeight: '15px',
                                                    borderRadius: '30px',
                                                    border: 'none'
                                                }
                                                }>{OrderLists[order].status}
                                                </button>
                                            </td>
                                        </tr>)
                                })}
                            </table>
                        </Box>
                    </Box>
                    <Box sx={{
                        marginLeft: '35%',
                        flex: 'end'
                    }}>
                        <CustomPagination
                            style={{
                                color: 'white',

                            }}
                            variant="outlined" shape="rounded" count={totalPage}
                            onChange={(event, value) => {
                                setPage(value);
                                setOrderStart(maxrow * (value - 1));
                                setOrderEnd(maxrow * value - 1)
                            }} size="large" page={page}/>

                    </Box>
                </Box>
                <Box>

                    {OrderLists[detailItem] && <Box sx={{
                        backgroundColor: 'rgba(252, 237, 227, 0.3)',
                        width: '600px',
                        minHeight: '750px',
                        borderRadius: '8px'
                    }}>
                        <OrderDetail detailItem={OrderLists[detailItem]}
                                     detailId={detailItem}
                                     Status={status}/>
                    </Box>
                    }
                </Box>
            </div>
            </div>

        </Container>
    )
})
const Container = styled(Box)`
  margin-top: 48px;
  background-color: white;
`
const BackgroundMenu = styled('div')`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  background-image: url(${IMG_BACKGROUND_STATISTIC});
  justify-content: center;
  font-size: 32px;
  color: white;
`

const ContentBox = styled('div')`
  background-color: #ec393e;
  padding: 12px 60px;
  display: flex;
  align-items: center;
  border-radius: 16px;
  box-shadow: 2px 2px 4px 0px #00000040;

`
const ContentBoxWhite = styled('div')`
  background-color: #ec393e;
  display: flex;
  align-items: center;
  border-radius: 16px;
  box-shadow: 2px 2px 4px 0px #00000040;

`
const ContentText = styled('span')`
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 25px;
  line-height: 34px;
  text-align: center;
  color: #FFFFFF;
`
const NumberText = styled('span')`
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 50px;
  line-height: 68px;
  text-align: center;
  color: #FFFFFF;
`
const RowSection = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 40px;
`
const BenefitImg = styled('img')`
  width: 80px;
  height: 80px;
`
const ThoiImg = styled('img')`
  height: 90%;
`