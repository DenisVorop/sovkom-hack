import React from 'react'
import styled from 'styled-components/macro'

import Button from '../../components/button/button'
import CKEditorWrapper from '../../components/ckeditor/ckeditor'
import Container from '../../components/container/container'
import Textarea from '../../components/textarea/textarea'
import Title from '../../components/title/title'

import StaticContent from '../../features/static-content/static-content'
import { useToggle } from '../../hooks/use-toggle'
import { buttonVariant, titleVariant } from '../../libs/consts'

const Wrapper = styled.div`
    padding: 12px 0;
`

const Content = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
`

const Tabs = styled.div`
    background: ${({ theme }) => theme.colors.bg.muted};
    border-radius: 4px;
    display: flex;
    align-items: center;
    padding: 4px;
    margin-bottom: 12px;
    width: fit-content;
`

const MiddleBlock = styled.div`
    margin-bottom: 24px;
`

const Tab = styled(Button).attrs((props) => ({
    ...props,
}))
    `
    padding: 4px 8px;
`

const NewsCreate: React.FC = () => {
    const [rawMode, toggleRawMode] = useToggle(false)
    const [createNewsFields, setCreateNewsFields] = React.useState<{
        title: string
        description: string
        text: string
        shortText: string
    }>({
        title: '',
        description: '',
        text: '<div class=\'wrapper\'><div class=\'title\'>Здесь можно создавать описание новости с помощью такой раметки</div><p>Благодаря этому можно стилизовать описания задачи для конкретной новости и сразу видеть, что выходит.</p><ul><li>Это пункт №1</li><li>Это пункт №2</li><li>Это пункт №3</li></ul></div>',
        shortText: '',
    })

    const contentStatic = React.useMemo(() => {
        return [{ text: createNewsFields.text }]
    }, [createNewsFields.text])

    const setTextFromTextarea = React.useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCreateNewsFields({ ...createNewsFields, text: e.target.value })
    }, [])

    return (
        <Wrapper>
            <Container>

                <Title variant={titleVariant.H4}>Создание новости</Title>
                <MiddleBlock>
                    <Tabs onClick={toggleRawMode}>
                        <Tab variant={rawMode && buttonVariant.SELL}>Text mode</Tab>
                        <Tab variant={!rawMode && buttonVariant.SELL}>Code mode</Tab>
                    </Tabs>
                    <Content>
                        <div>
                            {rawMode
                                ? <Textarea
                                    value={createNewsFields.text}
                                    onChange={setTextFromTextarea}
                                />
                                : <RichEditor
                                    value={createNewsFields.text}
                                    onChange={value => setCreateNewsFields({ ...createNewsFields, text: value })}
                                />
                            }
                        </div>
                        <StaticContentWrapper>
                            <StaticContent content={contentStatic} />
                        </StaticContentWrapper>
                    </Content>
                </MiddleBlock>
                <Button
                    variant={buttonVariant.BUY}
                    w="fit-content"
                >
                    Опубликовать
                </Button>

            </Container>
        </Wrapper >
    )
}

const RichEditor: React.FC<{ value: string, onChange: (value: string) => void }> = React.memo(({ value, onChange }) => {
    const editorRef = React.useRef<any>({})
    const [editorLoaded, setEditorLoaded] = React.useState(false)
    const { CKEditor, ClassicEditor } = editorRef.current || {}

    React.useEffect(() => {
        if (!editorRef.current) {
            return
        }
        editorRef.current = {
            CKEditor: require('@ckeditor/ckeditor5-react').CKEditor, //Added .CKEditor
            ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
            // ImageInsert : require( '@ckeditor/ckeditor5-image' ).ImageInsert
        }
        setEditorLoaded(true)
    }, [])
    return (
        <>
            {editorLoaded
                ? <CKEditorWrapper>
                    <CKEditor
                        editor={ClassicEditor}
                        data={value}
                        // config={{
                        //   plugins: [ImageInsert]
                        // }}
                        onChange={(_event: Event, editor: { getData: () => string }) => {
                            const data: string = editor.getData()
                            onChange(data)
                        }}
                    />
                </CKEditorWrapper>
                : <p>Загрузка пакета...</p>
            }
        </>
    )
})

export default React.memo(NewsCreate)

const StaticContentWrapper = styled.div`
    border: ${({ theme }) => `1px solid ${theme.colors.border.default}`};
    border-radius: 4px;
    padding: 8px 24px;
`
