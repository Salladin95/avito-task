import { createContext, ReactNode, useContext, useState } from "react"

import { MainStepFormType, PublishAdSecondStepFormType } from "~/pages/publish-ad-page/schemas.ts"

// Context Type
type FormContextType = {
	mainStepData: MainStepFormType | null
	secondStepData: PublishAdSecondStepFormType | null
	setMainStep: (data: MainStepFormType) => void
	setSecondStep: (data: PublishAdSecondStepFormType) => void
	resetForm: () => void
}

const PublishAdFormContext = createContext<FormContextType | undefined>(undefined)

// Hook to use the PublishAdFormContext
export const usePublishAdFormContext = () => {
	const context = useContext(PublishAdFormContext)
	if (!context) {
		throw new Error("useFormContext must be used within a FormProvider")
	}
	return context
}

// Provider Component
type FormProviderProps = {
	children: ReactNode
}

export const PublishAdFormProvider = ({ children }: FormProviderProps) => {
	const [mainStep, setMainStep] = useState<MainStepFormType | null>(null)
	const [secondStep, setSecondStep] = useState<PublishAdSecondStepFormType | null>(null)

	function resetForm() {
		setMainStep(null)
		setSecondStep(null)
	}

	return (
		<PublishAdFormContext.Provider
			value={{
				mainStepData: mainStep,
				secondStepData: secondStep,
				setMainStep,
				setSecondStep,
				resetForm,
			}}
		>
			{children}
		</PublishAdFormContext.Provider>
	)
}
