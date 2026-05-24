import type { ReactNode } from 'react';
import './globals.css';

export const metadata = {
	title: 'Charme Chicc',
	description: 'Moda feminina e acessórios',
	icons: {
		icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🎀</text></svg>',
	},
};

export const viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
};

export default function RootLayout({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
