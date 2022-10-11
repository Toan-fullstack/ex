import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { path } from 'src/constants/path'
import PropTypes from 'prop-types'
import qs from 'query-string'
import RatingStars from '../RatingStarts/RatingStars'
import * as S from './filterPanel.style'
import { Controller, useForm } from 'react-hook-form'

export default function FilterPanel({ categories, filters }) {
  // const navigate = useNavigate()

  const navigate = useNavigate()
  const location = useLocation()

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
    clearErrors,
    reset,
    setValue
  } = useForm({
    defaultValues: {
      minPrice: filters.minPrice || ' ',
      maxPrice: filters.maxPrice || ''
    },
    reValidateMode: 'onSubmit'
  })

  useEffect(() => {
    setValue('minPrice', filters.minPrice || '')

    setValue('maxPrice', filters.maxPrice || '')
  }, [setValue, filters])

  const searchPrice = data => {
    const { minPrice, maxPrice } = data
    if (minPrice !== '' || maxPrice !== '') {
      let _filters = filters
      if (minPrice !== '') {
        _filters = { ..._filters, minPrice }
      } else {
        delete _filters.minPrice
      }
      if (maxPrice !== '') {
        _filters = { ..._filters, maxPrice }
      } else {
        delete _filters.maxPrice
      }
      navigate(path.home + `?${qs.stringify(_filters)}`)
    }
  }

  const validPrice = () => {
    const minPrice = getValues('minPrice')

    const maxPrice = getValues('maxPrice')
    const message = 'Vui lòng điền khoảng giá phù hợp'
    if (minPrice !== '' && maxPrice !== '') {
      return Number(maxPrice) >= Number(minPrice) || message
    }
    return minPrice !== '' || maxPrice !== '' || message
  }

  const clearAll = () => {
    reset()
    navigate({
      pathname: path.home
    })
  }
  const handleActiveClassCategoryItem = category => {
    const query = qs.parse(location.search)
    return query.category === category._id ? 'active' : ''
  }
  return (
    <div>
      <S.CategoryTitleLink to={path.home}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
        Tất cả danh mục
      </S.CategoryTitleLink>
      <S.CategoryList>
        {categories.map(category => (
          <S.CategoryItem key={category._id}>
            <Link
              to={path.home + `?category=${category._id}`}
              className={handleActiveClassCategoryItem(category)}
            >
              {category.name}
            </Link>
          </S.CategoryItem>
        ))}
      </S.CategoryList>
      <S.CategoryTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
          />
        </svg>
        Bộ lọc tìm kiếm
      </S.CategoryTitle>
      <S.FilterGroup>
        <S.FilterGroupHeader>Khoảng giá</S.FilterGroupHeader>
        <S.PriceRange>
          <S.PriceRangeGroup>
            <Controller
              name="minPrice"
              control={control}
              rules={{
                validate: { validPrice }
              }}
              render={({ field }) => (
                <S.PriceRangeInput
                  placeholder="Từ"
                  onChange={value => {
                    clearErrors()
                    field.onChange(value)
                  }}
                  value={getValues('minPrice')}
                />
              )}
            />

            <S.PriceRangeLine />
            <Controller
              name="maxPrice"
              control={control}
              rules={{
                validate: { validPrice }
              }}
              render={({ field }) => (
                <S.PriceRangeInput
                  placeholder="Đến"
                  onChange={value => {
                    clearErrors()
                    field.onChange(value)
                  }}
                  value={getValues('maxPrice')}
                />
              )}
            />
          </S.PriceRangeGroup>
          {Object.values(errors).length !== 0 && (
            <S.PriceErrorMessage>
              Vui lòng điền khoảng giá phù hợp
            </S.PriceErrorMessage>
          )}
          <S.PriceRangeButton onClick={handleSubmit(searchPrice)}>
            Áp dụng{' '}
          </S.PriceRangeButton>
        </S.PriceRange>
      </S.FilterGroup>
      <S.FilterGroup>
        <S.FilterGroupHeader>Đánh giá</S.FilterGroupHeader>
        <RatingStars filters={filters} />
      </S.FilterGroup>
      <S.RemoveFilterButton onClick={clearAll}>Xoá tất cả</S.RemoveFilterButton>
    </div>
  )
}

FilterPanel.propTypes = {
  categories: PropTypes.array.isRequired,
  filters: PropTypes.object.isRequired
}
