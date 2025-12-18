import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button, Loading, Textbox } from "../components";
import { useRegisterMutation, useLoginMutation } from "../redux/slices/api/authApiSlice";
import { setCredentials } from "../redux/slices/authSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [registerUser, { isLoading: isRegistering }] = useRegisterMutation();
  const [login, { isLoading: isLoggingIn }] = useLoginMutation();

  const onSubmit = async (data) => {
    try {
      // register the user
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        title: data.title,
        role: data.role,
      }).unwrap();

      // auto-login after successful registration
      const res = await login({ email: data.email, password: data.password }).unwrap();

      dispatch(setCredentials(res));
      navigate('/');
    } catch (err) {
      toast.error(err?.data?.message || err.error || 'Registration failed');
    }
  };

  return (
    <div className='w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6] dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#302943] via-slate-900 to-black'>
      <div className='w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center'>
        <div className='w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center'>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white dark:bg-slate-900 px-10 pt-14 pb-14'
          >
            <div>
              <p className='text-blue-600 text-3xl font-bold text-center'>
                Create an account
              </p>
              <p className='text-center text-base text-gray-700 dark:text-gray-500'>
                Join and manage your tasks securely
              </p>
            </div>

            <div className='flex flex-col gap-y-5'>
              <Textbox
                placeholder='Your name'
                type='text'
                name='name'
                label='Full name'
                className='w-full rounded-full'
                register={register('name', { required: 'Name is required' })}
                error={errors.name ? errors.name.message : ''}
              />

              <Textbox
                placeholder='you@example.com'
                type='email'
                name='email'
                label='Email Address'
                className='w-full rounded-full'
                register={register('email', { required: 'Email Address is required' })}
                error={errors.email ? errors.email.message : ''}
              />

              <Textbox
                placeholder='password'
                type='password'
                name='password'
                label='Password'
                className='w-full rounded-full'
                register={register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
                error={errors.password ? errors.password?.message : ''}
              />
              <Textbox
                placeholder='e.g. Senior Developer'
                type='text'
                name='title'
                label='Title'
                className='w-full rounded-full'
                register={register('title', { required: 'Title is required' })}
                error={errors.title ? errors.title.message : ''}
              />

              <div className='w-full flex flex-col gap-1'>
                <span className='text-slate-900 dark:text-gray-500'>Role</span>
                <select
                  {...register('role', { required: 'Role is required' })}
                  className='bg-transparent px-3 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white outline-none text-base focus:ring-2 ring-blue-300 rounded-full'
                >
                  <option value=''>Select role</option>
                  <option value='Developer'>Developer</option>
                  <option value='Manager'>Manager</option>
                  <option value='Designer'>Designer</option>
                  <option value='Analyst'>Analyst</option>
                  <option value='Tester'>Tester</option>
                </select>
                {errors.role && (
                  <span className='text-xs text-[#f64949fe] mt-0.5 '>
                    {errors.role.message}
                  </span>
                )}
              </div>
            </div>

            {isRegistering || isLoggingIn ? (
              <Loading />
            ) : (
              <Button type='submit' label='Sign up' className='w-full h-10 bg-blue-700 text-white rounded-full' />
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
