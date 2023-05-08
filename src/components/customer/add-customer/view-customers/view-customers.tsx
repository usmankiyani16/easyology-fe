
import { Button } from 'antd';
import CustomersDetail from './customer-details/customers-detail';
import LastInvoices from './last-invoices/last-invoices';
import { NavLink } from 'react-router-dom';


const ViewCustomers = () => {
  return (
    <div className="_view-wrap">

      <CustomersDetail/>

      <LastInvoices />

      <div>
      <NavLink to='/view-all-invoices'>
      <div className='m-auto'>

          
            <Button className="_bg-primary-color _white-color _hover font-medium mt-4">
              View All Invoices
            </Button>

          </div>
          
          </NavLink>
      </div>
    

      
    </div>
  );
};

export default ViewCustomers;
