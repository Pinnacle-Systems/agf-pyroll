import { configureStore } from "@reduxjs/toolkit";
import { openTabs } from "./features";

import { poRegister, finYear, supplier, poData, misDashboardService, ordManagement } from './service'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
    reducer: {
        openTabs,
        [poRegister.reducerPath]: poRegister.reducer,
        [finYear.reducerPath]: finYear.reducer,
        [supplier.reducerPath]: supplier.reducer,
        [poData.reducerPath]: poData.reducer,
        [misDashboardService.reducerPath]: misDashboardService.reducer,
        [ordManagement.reducerPath]: ordManagement.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            poRegister.middleware,
            finYear.middleware,
            supplier.middleware,
            poData.middleware,
            misDashboardService.middleware,
            ordManagement.middleware
        ]
        ),
});

setupListeners(store.dispatch);
