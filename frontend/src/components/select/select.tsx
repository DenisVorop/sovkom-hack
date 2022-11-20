import React from 'react'
import styled from 'styled-components/macro'

import { ChevronDown, Close } from '../../assets/images/_images'
import { textVariant } from '../../libs/consts'

import Text from '../text/text'


interface IIsActiveList {
  isActiveList: boolean
}

interface ISelectedOption extends IIsActiveList {
  isMultiple: boolean
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`
const CustomSelectWrapper = styled.div<{ w?: string }>`
  position: relative;
  width: ${({ w }) => w};
`
const SelectedOption = styled.div<ISelectedOption>`
  display: flex;
  align-items: start;
  justify-content: space-between;
  padding: 8px 4px 8px 8px;
  height: 38px;
  background-color: ${({ theme }) => theme.colors.bg.default};
  border: 0;
  border-radius: 4px;
  gap: 8px;

  :hover {
    cursor: pointer;
  }
`
const ChevronWrapper = styled.div<IIsActiveList>`
  transition: all 0.3s ease 0s;
  transform: ${({ isActiveList }) => isActiveList ? 'scaleY(-1)' : 'scaleY(1)'};
  display: flex;
  align-items: center;
  justify-content: center;
`
const List = styled.div<IIsActiveList>`
  width: 100%;
  position: absolute;
  top: 100%;
  margin-top: 4px;
  right: 0;
  transform: translateY(-1px);
  user-select: none;
  padding: 4px 0;
  border: ${({ theme }) => `1px solid ${theme.colors.border.default}`};
  border-radius: 4px;
  z-index: 2;
  transition: all 0.3s ease 0s;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.bg.default};
  color: ${({ theme }) => theme.colors.fg.default};
`
const Option = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 0;
  padding: 4px 8px;
  transition: all 0.3s ease 0s;

  :hover {
    cursor: pointer;
    background: ${({ theme }) => `${theme.colors.bg.muted}`};
    /* background-color: rgba(161, 196, 255, 0.4); */
  }

  :disabled {
    color: ${({ theme }) => theme.colors.bg.subtle};
    background: ${({ theme }) => `${theme.colors.bg.default}`};

    :hover {
      cursor: default;
    }
  }
`
const Options = styled.div`
  display: flex;
  align-items: center;
  user-select: none;
  white-space: nowrap;
  flex-wrap: wrap;
  gap: 0;
`


export interface IOption {
  value: string
}

interface CustomSelectProps {
  list: IOption[]
  selectHandler: (item: IOption | IOption[]) => void
  label?: string
  selected: IOption | IOption[]
  noSelect?: boolean
  multiple?: boolean
  w?: string
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  list,
  selectHandler,
  label,
  selected,
  noSelect = false,
  multiple = false,
  w,
}) => {
  const [selectedItems, setSelectedItems] = React.useState<IOption | IOption[]>(selected)
  const [isActiveList, setIsActiveList] = React.useState<boolean>(false)

  React.useEffect(() => {
    setSelectedItems(selected)
  }, [selected])

  const handleChangeSelectedItem = React.useCallback((item: IOption) => {
    setIsActiveList(false)
    multiple
      ? selectHandler([...(selectedItems as IOption[]), item])
      : selectHandler(item)
  }, [selectHandler, selectedItems, multiple])

  const handleChangeActiveList = React.useCallback(() => {
    setIsActiveList(!isActiveList)
  }, [isActiveList])

  const openSelectList = React.useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    handleChangeActiveList()
  }, [handleChangeActiveList])

  React.useEffect(() => {
    isActiveList
      ? document.body.addEventListener('click', handleChangeActiveList)
      : document.body.removeEventListener('click', handleChangeActiveList)
    return () => document.body.removeEventListener('click', handleChangeActiveList)
  }, [handleChangeActiveList, isActiveList])

  return (
    <Wrapper>
      {label && <Text variant={textVariant.T3}>{label}</Text>}
      {!noSelect && (
        <CustomSelectWrapper w={w}>
          <SelectedOption onClick={openSelectList} isActiveList={isActiveList} isMultiple={multiple}>
            <Options>
              {
                multiple
                  ? (selectedItems as IOption[])?.map((item: IOption, index: number) => <MultipleOption
                    key={index}>{item?.value}</MultipleOption>)
                  : (selectedItems as IOption)?.value
              }
            </Options>
            <ChevronWrapper isActiveList={isActiveList}>
              <ChevronDown />
            </ChevronWrapper>
          </SelectedOption>
          {isActiveList && list?.length
            ? (
              <List isActiveList={isActiveList}>
                {list
                  .map((item: IOption, index: number) => (
                    <Option
                      key={index}
                      onClick={() => handleChangeSelectedItem(item)}
                      disabled={
                        multiple
                          ? !!(selectedItems as IOption[]).find((selectedItem: IOption) => selectedItem.value === item.value)
                          : (selectedItems as IOption).value === item.value
                      }
                    >
                      <Text variant={textVariant.T2}>{item.value}</Text>
                    </Option>
                  ))
                }
              </List>
            )
            : null
          }
        </CustomSelectWrapper>
      )}
    </Wrapper>
  )
}


const OptionWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.bg.default};
`

interface IMultipleOptionProps {
  children: React.ReactNode
}

const MultipleOption: React.FC<IMultipleOptionProps> = React.memo(({ children }) => {
  const removeOptionHandler = React.useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
  }, [])

  return (
    <OptionWrapper onClick={removeOptionHandler}>
      <Text variant={textVariant.T3}>
        {children}
      </Text>
      <Close />
    </OptionWrapper>
  )
})


export default React.memo(CustomSelect)
