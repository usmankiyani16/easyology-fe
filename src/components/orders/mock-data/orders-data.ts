const ordersData =  [
    { key: 1, OrderId: "3456", OrderType: "Mobile Order", date:'24-12-2023'  , customerName: 'Ali Raza' , InvoiceStatus: 'Paid', orderStatus: 'Waiting to be shipped', timeSlot: '2:00pm', expectedTime:'4:00pm'},
    { key: 2, OrderId: "9839",OrderType: "Ipad Order",date:'24-12-2023' ,customerName: 'Ahmed' , InvoiceStatus: 'Paid',orderStatus: 'Completed', timeSlot: '2:00pm',expectedTime:'4:00pm' , trackingNo:'EA 999 999 999 US', clerkName:'Ali Raza',completedTime:'5:00pm'},

    { key: 3, OrderId: "8906",OrderType: "Web Order" ,date:'24-12-2023', customerName: 'Usman' , InvoiceStatus: 'Unpaid',orderStatus: 'Pickup from Store', timeSlot: '2:00pm',expectedTime:'4:00pm'},
    { key: 4, OrderId: "1234",OrderType: "Tablet Order" ,date:'24-12-2023' ,customerName: 'Hasan', InvoiceStatus: 'Partially Paid',orderStatus: 'Waiting to be delivered' , timeSlot: '2:00pm',expectedTime:'4:00pm'},
    { key: 5, OrderId: "9839",OrderType: "Ipad Order",date:'24-12-2023' ,customerName: 'Saqlain' , InvoiceStatus: 'Paid',orderStatus: 'In Route', timeSlot: '2:00pm',expectedTime:'4:00pm'},

   
  ]

  
  export default ordersData