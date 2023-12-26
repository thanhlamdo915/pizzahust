import React, {memo, useCallback, useEffect, useState} from "react";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {Header} from "../component/Header";
import {IMG_MOTORBIKE, IMG_ORDER_BACKGROUND} from "../assets";
import {Grid, Modal, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useDispatch} from "react-redux";
import {BillOrder} from "../component/BillOrder";
import {EmptyCart} from "../component/EmptyCart";
import axios from "axios";


const style = {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    outline: 'none'
};
export const Order = memo(function Order() {
    const [orders, setOrders] = useState({})
    const [currentId, setCurrentId] = useState(0);
    const [isOpen, setOpen] = useState(true)
    const [phone, setPhone] = useState('')

    const onSubmit = useCallback(async () => {
        try {
            const result = await axios.get('https://pizzahust-c5035-default-rtdb.firebaseio.com/order.json')
            console.log('vao day')
            let _data = Object.entries(result.data).filter((item,index)=>{
                return item[1].phone == phone
            })
            setOrders(_data)
        } catch (err) {
            console.log('ko lay dc order', err)
        }
    }, [orders,phone])
    console.log('order',orders)
    const onClose = useCallback(()=>{
        setOpen(!isOpen)
    },[isOpen])
    return (
        <Container>
            <Header/>
            <BackgroundMenu>YOUR ORDER</BackgroundMenu>
            <SModal open={isOpen}
                    onClose={onClose}

            >
                <Box sx={style}>
                    <div>Vui lòng cung cấp số điện thoại của bạn để tra cứu thông tin đơn hàng</div>
                    <br/>
                    <InputText
                        value={phone}
                        variant="standard" // <== changed this
                        placeholder="Số điện thoại"
                        InputProps={{
                            disableUnderline: true, // <== added this
                        }}
                        onChange={e => setPhone(e.target.value)}
                    />
                    <br/>
                    <ButtonLogin onClick={()=>{
                        onSubmit()
                        setOpen(false)
                    }}>
                        <TextNormal style={{color: "white"}}>XÁC NHẬN</TextNormal>
                    </ButtonLogin>
                </Box>
            </SModal>

            {orders.length > 0 ?
                <ContentContainer>
                    <Grid container spacing={2}>
                        <BillOrder
                            //id
                            code={orders[currentId][0]}
                            //entities của id ấy
                            order={orders[currentId][1]}
                        />
                        <Grid item xs={6} md={6}>
                            <HistoryOrder>
                                <MotorbikeImage src={IMG_MOTORBIKE}/>
                                <TextHistory>LỊCH SỬ ĐƠN HÀNG</TextHistory>
                                <br/>
                                {
                                    orders.map((item, index) =>
                                        <ButtonSelectOrder
                                            onClick={() => {
                                                setCurrentId(index)
                                            }}
                                        >
                                            <TextButtonSelect>{"Mã đơn hàng: " + item[0]}</TextButtonSelect>
                                        </ButtonSelectOrder>
                                    )
                                }
                            </HistoryOrder>
                        </Grid>
                    </Grid>
                </ContentContainer> :
                <EmptyCart
                    title={'BẠN CHƯA CÓ ĐƠN HÀNG NÀO'}
                    content={'Hiện tại bạn chưa có sản phẩm nào trong giỏ hàng. ' +
                        'Hãy dạo một vòng Thực đơn để chọn sản phẩm yêu thích nhé, PizzaHUST có nhiều món ngon lắm!'}
                />
            }
        </Container>
    )
})
const Container = styled(Box)`
  margin-top: 48px;
  background-color: #F4F1F1;
  outline: none;
`
const BackgroundMenu = styled('div')`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  background-image: url(${IMG_ORDER_BACKGROUND});
  justify-content: center;
  font-size: 32px;
  color: white;
`
const ContentContainer = styled(Box)`
  flex-grow: 1;
  background-color: #F4F1F1;
  margin: 16px 80px;
`

const HistoryOrder = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const MotorbikeImage = styled('img')`
  width: 280px;
  height: 240px;
`
const TextHistory = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid black;
  padding-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  margin-top: 24px;
  width: 60%;
`
const ButtonSelectOrder = styled(Button)`
  background-color: #ec393e;
  border-radius: 12px;
  height: 100%;
  width: 60%;
  margin: 16px 0;
`
const TextButtonSelect = styled('p')`
  font-size: 16px;
  color: white;
`
const SModal = styled(Modal)`
  border: none;
`

const InputText = styled(TextField)`
  display: flex;
  justify-content: center;
  background-color: white;
  border-radius: 8px;
  width: 80%;
  box-shadow: 2px 2px 4px 0px #00000040;
  height: 32px;
  padding-left: 12px;
  margin-top: 8px;
  margin-bottom: 8px;
  font-size: 16px;
`
const ButtonLogin = styled(Button)`
  width: 80%;
  height: 32px;
  background-color: #EC393E;
  border-radius: 12px;
  margin-top: 12px;
`
const TextNormal = styled('span')`
  color: black;
`