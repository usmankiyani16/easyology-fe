import React, { useState } from "react";


import { Button, Modal, Form, Input, Select } from "antd";


const VoidInvoice: React.FC<any> = ({
    isVoidOpen,
    setIsVoidOpen,
}) => {

 const [isVoidSelected, setIsVoidSelected] = useState(false);

  const onFinish =(values: any) => {
    console.log(values, 'Void Object');
   
  };

  const selectProps = {
    dropdownStyle: { maxHeight: 140 },
    
  };

  return (
    <div>
      <Modal
        width={400}
    
        footer={false}
        centered
        open={isVoidOpen}
        onCancel={() => setIsVoidOpen(false)}
        destroyOnClose={true}
        className="_modal_wrap"
        
        
      >
        <h3 className="_modal_header_poView _primary-color">Select a reason to void</h3>

        <Form
       
     
          // style={{ maxWidth:  }}
          onFinish={onFinish}
          autoComplete="off"
          className="mt-8"
        >
          <Form.Item


            name="void"
            required
            tooltip="This is a required field"
            rules={[
              {
                required: true,
                // type: 'email',
                message: "Required Field",
              },
            ]}
     
            className={`${!isVoidSelected && "h-[152px]"}`}
          >
            <Select
              className="_input_field"
              placeholder="Reason to void"
              onChange={() => setIsVoidSelected(true)}
              {...selectProps}
            >
              
                <Select.Option key={1} value='Cancellation of invoice by customer'>
                  Cancellation of invoice by customer
                </Select.Option>
                <Select.Option key={2} value='Error in total calculation'>
                  Error in total calculation
                </Select.Option>
                <Select.Option key={3} value='Wrong Customer added'>
                  Wrong Customer added
                </Select.Option>
                <Select.Option key={4} value='Other'>
                  Other
                </Select.Option>
           
            </Select>
          </Form.Item>
 
          
        
          {isVoidSelected && (
          <div className="flex justify-center">
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-36 text-center text-lg mt-12"
              >
                Void
              </Button>
            </Form.Item>
          </div>

          )}
        </Form>
      </Modal>
    </div>
  );
};

export default VoidInvoice;
