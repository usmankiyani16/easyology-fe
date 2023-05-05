import { Button } from 'antd';
import CustomersDetail from './customer-details/customers-detail';
import LastInvoices from './last-invoices/last-invoices';


const ViewCustomers = () => {
  return (
    <div className="_view-wrap">

      <CustomersDetail/>

      <LastInvoices />

      <div>
      <div className='m-auto flex justify-center'>
            <Button className="_bg-primary-color _white-color _hover font-medium mt-4">
              View All Invoices
            </Button>
          </div>
      </div>
    

      
    </div>
  );
};

export default ViewCustomers;
