<script lang='ts'>
	import { setupIonicBase } from 'ionic-svelte';

	/* Call Ionic's setup routine */
	setupIonicBase();

	/* Import all components - or do partial loading - see below */
	import 'ionic-svelte/components/all';
	
	import IonTabs from 'ionic-svelte/components/IonTabs.svelte';
	/*
	import 'ionic-svelte/components/ion-app';
	import 'ionic-svelte/components/ion-card';
	import 'ionic-svelte/components/ion-card-title';
	import 'ionic-svelte/components/ion-card-subtitle';
	import 'ionic-svelte/components/ion-card-content';
	import 'ionic-svelte/components/ion-chip';
	import 'ionic-svelte/components/ion-button';
	import 'ionic-svelte/components/ion-tabs';
	import 'ionic-svelte/components/ion-label';
	import 'ionic-svelte/components/ion-item';	
	*/
	/* Theme variables */
	import '../theme/variables.css';

	
	import { pin } from 'ionicons/icons';

	const tabs = [
		{
			label: 'Contacts',
			icon: pin,
			tab: 'contacts'
		}
	];

	const logStuff = () => {};
</script>

<ion-app>
    <ion-item>
        <ion-label>
            <h1>Patient Advocacy App</h1>
        </ion-label>
    </ion-item>

    <IonTabs slot="bottom" tabs={tabs} ionTabsWillChange={logStuff} ionTabsDidChange={logStuff}>
	    <slot />
    </IonTabs>
</ion-app>
