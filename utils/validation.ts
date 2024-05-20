import * as Yup from 'yup'

export const logInSchema = Yup.object().shape({
	email: Yup.string().email('Not a valid email').required('Email is missing'),
	password: Yup.string().required('Password is missing')
})

export const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Not a valid email').required('Email is required'),
  password: Yup.string().required('Password is missing').min(6, 'Password must be atleast 8 characters long'),
  confirmPassword: Yup.string()
    .required('Please re-enter your password')
    .oneOf([Yup.ref('password')], 'Passwords do not match'),
})

// export const categorySchema = Yup.object().shape({
//   name: Yup.string().required('类别名称不能为空'),
//   slug: Yup.string().required('路径名不能为空'),
//   image: Yup.string()
//     .required('输入图片地址')
//     .url('无效的图像地址')
//     .matches(/\.(gif|jpe?g|png|webp)$/i, '图像地址必须是有效的图像URL'),
// })

// export const bannerSchema = Yup.object().shape({
//   title: Yup.string().required('名称不能为空'),
//   image: Yup.object().shape({
//     url: Yup.string()
//       .required('请输入图片地址')
//       .url('地址无效')
//       .matches(/\.(gif|jpe?g|png|webp)$/i, '图像地址必须是有效的图像URL'),
//   }),
// })

// export const sliderSchema = Yup.object().shape({
//   title: Yup.string().required('名称不能为空'),
//   image: Yup.object().shape({
//     url: Yup.string()
//       .required('请输入图片地址')
//       .url('地址无效')
//       .matches(/\.(gif|jpe?g|png|webp)$/i, '图像地址必须是有效的图像URL'),
//   }),
// })

// export const reviewSchema = Yup.object().shape({
//   title: Yup.string().required('评价标题不能为空').min(4, '评价标题不得少于4个字符'),
//   comment: Yup.string().required('评价文字不能为空').min(4, '评价文字不应少于 4 个字符'),
// })

// export const addressSchema = Yup.object().shape({
//   province: Yup.object().shape({
//     name: Yup.string().required('请选择您居住的省份'),
//   }),
//   city: Yup.object().shape({
//     name: Yup.string().required('请选择您的居住的城市'),
//   }),
//   area: Yup.object().shape({
//     name: Yup.string().required('请选择您的居住的区县'),
//   }),
//   street: Yup.string().required('街道名称不能为空'),
//   postalCode: Yup.string().required('请输入您的邮政编码'),
// })

// export const nameSchema = Yup.object().shape({
//   name: Yup.string().required('必须登记姓名').min(3, '名字必须超过 3 个字符'),
// })

// export const mobileSchema = Yup.object().shape({
//   mobile: Yup.string()
//     .required('手机号码必须注册')
//     .min(11, '手机号码必须为 11 位数字')
//     .max(11, '手机号码必须为 11 位数字'),
// })

