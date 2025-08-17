import { Head } from '@inertiajs/react'
import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
const schema = z.object({
  todo: z.string(),
})

export default function Home(props: { version: number }) {
  const [todos, setTodos] = useState<Array<string>>([])
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      todo: '',
    },
  })
  function onSubmit({ todo }) {
    setTodos([...todos, todo])
    form.reset()
  }
  return (
    <>
      <Head title="Homepage" />
      <ul>
        {todos.map((todo) => (
          <li key={todo}>{todo}</li>
        ))}
      </ul>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="todo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Todo</FormLabel>
                <FormControl>
                  <Input placeholder="Todo" {...field} />
                </FormControl>
                <FormDescription>What needs to be done?</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Add Todo</Button>
        </form>
      </Form>
    </>
  )
}
