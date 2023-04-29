import { useState } from 'react';
import { storage } from '../config/firebase';
import { ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';

export default function SendImages() {
	const [fileUpload, setFileUpload] = useState<File>();
	const [imagePreviewUrl, setImagePreviewUrl] = useState('');

	function handleFileSelect(file: File) {
		setFileUpload(file);

		const reader = new FileReader();
		reader.onloadend = () => {
			setImagePreviewUrl(reader.result as string);
		};
		reader.readAsDataURL(file as Blob);
	}

	async function uploadFile() {
		if (!fileUpload) return;

		const filesFolderRef = ref(
			storage,
			`projectFiles/new/${fileUpload.name + v4()}`
		);

		try {
			await uploadBytes(filesFolderRef, fileUpload);
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<div>
			<input
				type='file'
				onChange={(e) => handleFileSelect(e.target.files?.[0] as File)}
			/>
			<button onClick={uploadFile}>Upload File</button>
			<br />
			<br />
			{imagePreviewUrl && (
				<img
					src={imagePreviewUrl}
					alt='preview'
					width='300'
				/>
			)}
		</div>
	);
}
