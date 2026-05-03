import {
    getOrders,
    createOrder,
    updateOrder,
    deleteOrder
} from '../api/orders';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';


export const useOrders = () => {
    return useQuery ({
        queryKey: ['orders'],
        queryFn: getOrders,
    });
};

export const useCreateOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createOrder,
            onSuccess: () => {
                queryClient.invalidateQueries(['orders']);
                toast.success('Order created successfully');
            },
            onError: (error) => {
                toast.error(error.message || 'Failed to create order');
            }
        })
};

export const useUpdateOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateOrder,
            onSuccess: () => {
                toast.success('Order updated successfully');
                queryClient.invalidateQueries(['orders']);
            },
            onError: (error) => {
                toast.error(error.message || 'Failed to update order');
            }
        })
};

export const useDeleteOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteOrder,
            onSuccess: () => {
                queryClient.invalidateQueries(['orders']);
                toast.success('Order deleted successfully');
            },
            onError: (error) => {
                toast.error(error.message || 'Failed to delete order');
            }
        })
};