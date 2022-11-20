import React from 'react'
// import styled from 'styled-components/macro'

// interface IWrapperProps {
//     active: boolean
// }

// const Wrapper = styled.div<IWrapperProps>`
// 	z-index: 1;
// 	width: 100vw;
// 	height: 100vh;
// 	background-color: rgba(0, 0, 0, 0.4);
// 	position: fixed;
// 	top: 0;
// 	left: 0;
// 	display: flex;
// 	align-items: center;
// 	justify-content: center;
// 	transition: all 0.3s ease 0s;

// 	opacity: ${({ active }) => (active ? 1 : 0)};
// 	pointer-events: ${({ active }) => (active ? 'all' : 'none')};
// `

// interface IBodyProps {
//     active: boolean
// }
// const Body = styled.div<IBodyProps>`
// 	z-index: 1;
// 	padding: 40px;
// 	width: 664px;
// 	background: ${({ theme }) => theme.colors.bg.default};
// 	border: 1px solid rgba(254, 254, 252, 0.4);
// 	border-radius: 24px;
// 	transition: all 0.3s ease 0s;
// 	display: flex;
// 	flex-direction: column;
// 	gap: 16px;
// 	transform: ${({ active }) => (active ? 'scale(1)' : 'scale(.5)')};
// 	box-shadow: ${({ theme }) => `0px 0px 60px ${theme.color_opacity.light_gray_20}`};
// `

// interface IPopupProps {
//     setIsVisible: (isVisible: boolean) => void
//     isVisible: boolean
// }

// const Popup: React.FC<React.PropsWithChildren<IPopupProps>> = ({
//     children,
//     setIsVisible,
//     isVisible,
// }) => {

//     React.useEffect(() => {
//         document.body.style.overflow = isVisible ? 'hidden' : 'auto'
//         return () => { document.body.style.overflow = 'auto' }
//     }, [isVisible])

//     return (
//         <Wrapper active={isVisible} onClick={() => setIsVisible(false)}>
//             <Body active={isVisible} onClick={(e) => e.stopPropagation()}>
//                 {children}
//             </Body>
//         </Wrapper>
//     )
// }

// export default React.memo(Popup)
