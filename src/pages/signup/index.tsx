import Head from "next/head";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const signupSchema = z
  .object({
    username: z.string().min(1),
    email: z.string().email().min(1),
    password: z.string().min(1),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"], // path of error
    message: "Password don't match",
  });

type ValidationSchema = z.infer<typeof signupSchema>;

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    console.log(data);
  };

  return (
    <>
      <Head>
        <title>Sign up</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" {...register("username")} />
            {errors.username && <p>{errors.username?.message}</p>}
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" {...register("email")} />
            {errors.email && <p>{errors.email?.message}</p>}
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" {...register("password")} />
            {errors.password && <p>{errors.password?.message}</p>}
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && <p>{errors.confirmPassword?.message}</p>}
          </div>

          <input disabled={!isValid} type="submit" value="Sign up" />
        </form>
      </main>
    </>
  );
}
