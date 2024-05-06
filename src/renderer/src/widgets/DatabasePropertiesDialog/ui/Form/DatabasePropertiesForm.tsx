import { DatabaseProperties } from '@renderer/features/fetchDataForm/models/types/fetchDataFormSchema'
import { AppForm } from '@renderer/shared/ui/AppForm/AppForm'
import { Button, ButtonTheme } from '@renderer/shared/ui/Button/Button'
import { Input } from '@renderer/shared/ui/Input/Input'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import cls from './DatabasePropertiesForm.module.css'
import { useAppDispatch } from '@renderer/shared/hooks/useAppDispatch/useAppDispatch'
import { useState } from 'react'
import { fetchDataFormActions } from '@renderer/features/fetchDataForm'

interface DatabasePropertiesFormProps {
  className?: string
  defaultValues?: DatabaseProperties
  onSubmitSuccess?: () => void
}
const DatabaseFormSchema: z.ZodType<DatabaseProperties> = z.object({
  database: z
    .string({
      required_error: 'Название базы данных не может быть пустым'
    })
    .min(1, { message: 'Название базы данных не может быть пустым' }),
  user: z
    .string({
      required_error: 'Имя пользователя не может быть пустым'
    })
    .min(1, { message: 'Имя пользователя не может быть пустым' }),
  password: z
    .string({
      required_error: 'Пароль не может быть пустым'
    })
    .min(1, { message: 'Пароль не может быть пустым' }),
  host: z
    .string({
      required_error: 'Хост не может быть пустым'
    })
    .min(1, { message: 'Хост не может быть пустым' }),
  port: z.coerce.number({
    required_error: 'Порт не может быть пустым'
  }),
  tableName: z.string().optional()
})

type DatabaseFormSchemaType = z.infer<typeof DatabaseFormSchema>

export const DatabasePropertiesForm = (props: DatabasePropertiesFormProps) => {
  const { className, defaultValues, onSubmitSuccess } = props
  const dispatch = useAppDispatch()
  const [formError, setFormError] = useState<string>('')
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<DatabaseFormSchemaType>({
    resolver: zodResolver(DatabaseFormSchema),
    defaultValues: defaultValues,
    mode: 'onTouched'
  })
  return (
    <AppForm
      error={formError}
      id={'databaseForm'}
      onSubmit={handleSubmit(async (data) => {
        try {
          await window.api.checkDBConnection(data)
          dispatch(fetchDataFormActions.setDatabaseData(data))
          onSubmitSuccess?.()
        } catch (err) {
          setFormError((err as Error).message)
        }
      })}
      className={className}
    >
      <label htmlFor={'databaseForm'}>
        <h2 className={cls.formTitle}> Форма подключения к базе данных</h2>
      </label>
      <Controller
        control={control}
        render={({ field }) => (
          <Input error={errors.database?.message} required label={'База данных'} {...field} />
        )}
        name="database"
      />

      <Controller
        control={control}
        render={({ field }) => (
          <Input error={errors.user?.message} required label={'Пользователь'} {...field} />
        )}
        name="user"
      />

      <Controller
        control={control}
        render={({ field }) => (
          <Input
            error={errors.password?.message}
            required
            type="password"
            label={'Пароль'}
            {...field}
          />
        )}
        name="password"
      />

      <Controller
        control={control}
        render={({ field }) => (
          <Input error={errors.host?.message} required label={'Хост'} {...field} />
        )}
        name="host"
      />

      <Controller
        control={control}
        render={({ field }) => (
          <Input error={errors.port?.message} type="number" label={'Порт'} {...field} />
        )}
        name="port"
      />

      <Button type="submit" theme={ButtonTheme.BACKGROUND} className={cls.button}>
        Сохранить
      </Button>
    </AppForm>
  )
}
