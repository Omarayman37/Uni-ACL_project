import { Image, Avatar, Button } from 'antd';
import React from 'react'

function AdminPage() {
    return (
      <div>
          
        <Avatar
    
          src={
            <Image
              src="https://joeschmoe.io/api/v1/random"
              style={{
                width: 32,
              }}
            />
          }
        />

        
      </div>
    );
}

export default AdminPage
