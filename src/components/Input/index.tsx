import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { TextInputProps } from 'react-native'
import { Container, TextInput, Icon } from './styles'
import { useField } from '@unform/core'

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = ({ name, icon, ...rest }, ref) => {
  const inputElementRef = useRef<any>(null)
  const { registerField, defaultValue = '', fieldName, error } = useField(name)
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue })

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleFieldFocus = useCallback(() => { setIsFocused(true) }, [])
  const handleInputBlur = useCallback(() => {
    setIsFocused(false)
    setIsFilled(!!inputValueRef.current.value)
  }, [])

  useImperativeHandle(
    ref,
    () => ({
      focus() {
        inputElementRef.current.focus()
      }
    }),
    [inputElementRef],
  )

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value })
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      }
    })
  }, [fieldName, registerField])

  return (
    <Container isFocused={isFocused} hasError={!!error}>
      <Icon isFilled={isFilled} name={icon} size={20} />
      <TextInput
        ref={inputElementRef}
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        defaultValue={defaultValue}
        onFocus={handleFieldFocus}
        onBlur={handleInputBlur}
        onChangeText={(value) => { inputValueRef.current.value = value }}
        {...rest}
      />
    </Container>
  )
}

export default forwardRef(Input)
