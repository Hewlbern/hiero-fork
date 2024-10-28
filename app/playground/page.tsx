import Head from "next/head";
import HieroCentricLogin from '@/components/passkey/human-centric-payments-login';

export default function Playground() {
	const structuredData = {
		"@context": "https://schema.org",
			"@type": "WebPage",
			"name": "Hiero Wallet Sign In Demo",
			"description": "Experience Hiero's human-centric wallet authentication system. Connect your wallet securely and manage your AI subscriptions with ease."
		};

	return (
		<>
			<Head>
				<title>Hiero Wallet Sign In | Secure Web3 Authentication</title>
				<meta
					name="description"
					content="Try Hiero's streamlined wallet authentication system. Connect your wallet securely and experience our human-centric approach to Web3 payments."
				/>
				<meta
					name="keywords"
					content="Hiero, wallet signin, Web3 authentication, blockchain wallet, secure login, cryptocurrency payments"
				/>
				<meta property="og:title" content="Hiero Wallet Sign In | Secure Web3 Authentication" />
				<meta
					property="og:description"
					content="Connect your wallet to Hiero's secure authentication system. Experience our human-centric approach to Web3 payments and wallet management."
				/>
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://hiero.gl" />
				<link rel="canonical" href="https://hiero.gl" />
				<script type="application/ld+json">{JSON.stringify(structuredData)}</script>
			</Head>
				<HieroCentricLogin />
			
		</>
	);
}
