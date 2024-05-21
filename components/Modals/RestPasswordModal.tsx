
// // Node Modules
// import React from 'react';
// import { SafeAreaView, View, TextInput, Modal, KeyboardAvoidingView } from 'react-native'
// // * Routing
// import { useRouter } from 'expo-router';
// // *Styling
// import { StyleSheet } from 'react-native'
// import { text } from '@/styles/text.styles'
// import { container } from '@/styles/containers.styles'
// // Components
// import { HorizontalPaddedView } from '@/components/Views/PaddedView'
// import { BoldText } from '@/components/Text/StyledText';
// import { IconPressable } from '@/components/Buttons/CustomPressable';
// import CustomLink from '@/components/Buttons/CustomLink';
// import ForgotPasswordForm from '@/components/Forms/ForgotPasswordForm';
// import KeyboardView from '../Utils/KeyboardView';
// // Context


// export default function ResetPasswordModal({ isVisible, onClose, children  }){
//   const router = useRouter();
  
//   return (
//     <Modal style={styles.modal} propogateSwipe={true} animationType='slide' transparent={true} visible={isVisible}>
     
//       <View style={styles.modalContent}>
//       {/* <KeyboardView> */}
//           <HorizontalPaddedView >
//             {/* Back Button */}
//             <IconPressable
//               style={[container.back_button, text.black, text.icon]}
//               icon={'chevron-down'}
//               onPress={() => onClose()}
//             ></IconPressable>

//             {/* Header */}
//             <View style={container.header}>
//               <BoldText style={[text.large, text.black]}>{'Forgot\nPassword.'}</BoldText>
//             </View>

//             {/* Form */}
//             <ForgotPasswordForm onClose={onClose} />

//           </HorizontalPaddedView>
//           {children}
//           {/* </KeyboardView> */}
//       </View>
      
//     </Modal>
//   );
// }
