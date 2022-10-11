import { createAsyncThunk } from '@reduxjs/toolkit'
import React from 'react'
import productApi from 'src/api/product.api'
import { payloadCreator } from 'src/utils/helper'

export const getProductDetail = createAsyncThunk(
  'productDetail/getProductDetail',
  payloadCreator(productApi.getProductDetail)
)
