import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function Login() {
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      {/* Blue shaded banner section */}
      <div className='bg-blue-600 text-white hidden md:flex items-end justify-start px-6 py-8 md:w-2/5 w-full h-52 md:h-auto'>
        <h1 className='text-3xl md:text-4xl font-bold'>Yarsa Test Part Two</h1>
      </div>

      {/* Login form section */}
      <div className='flex-1 flex items-center justify-center px-4 py-10'>
        <Card className='w-full max-w-md shadow-lg'>
          <CardHeader>
            <CardTitle className='text-center text-2xl'>Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form className='space-y-6'>
              <div className='space-y-2'>
                <Label htmlFor='username'>Username</Label>
                <Input id='username' name='username' placeholder='Enter your username' />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='password'>Password</Label>
                <Input
                  id='password'
                  name='password'
                  type='password'
                  placeholder='Enter your password'
                />
              </div>

              <Button type='submit' className='w-full'>
                Sign in
              </Button>
            </form>

            <div className='mt-6 text-center text-sm text-muted-foreground'>
              <p>Demo credentials:</p>
              <p className='text-blue-600'>username: johnd | password: m38rmF$</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
