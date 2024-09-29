interface User {
    name: string;        
    email: string;       
    phone: string;       
    address: string;    
}

export interface Order {
    cartItemIds: string[];  
    totalPrice: number;      
    user: User;            
    orderDate?: Date;       
    status?: 'pending' | 'processing' | 'completed' | 'canceled'; 
}