<script lang="ts">
export let data;
import { onMount } from 'svelte';

const userID = 2;

type RUser = {
  id: number;
  name: string;
  image?: string;
}

type Message = {
  id: number;
  author: number;
  text: string;
}

const contacts: Array<RUser> = [
  {
    id: 1,
    name: 'Doctor 1'
  },
  {
    id: 2,
    name: 'Doctor 2'
  }
];

const messages: Array<Message> = [
  {
    id: 1,
    author: 1,
    text: "Hi!"
  },
  {
    id: 2,
    author: 2,
    text: "Hi back!"
  }
];



let chatId = -1;

console.log(data.name);


onMount(async () => {
    const d = await fetch('/chats');
    console.log(d);
})

</script>

<style>

.msgtxt {
  display: inline-block;
  border-radius: 5%;
}

.msgmine {
  text-align: end;
}

</style>

<ion-tab tab="contacts">
<ion-card>
  <ion-card-header>
    <ion-card-title>
      {chatId == -1? "Contacts" : chatId}
    </ion-card-title>
  </ion-card-header>

  <ion-card-content>
  <ion-list>
    {#if chatId == -1}
    {#each contacts as contact}
      <ion-item on:click={() => {chatId = 1}}
                on:keypress={() => {chatId = 1}}
                role="button"
                tabindex="-1"
                class="ion-activatable ripple-parent rounded-rectangle">
        

        <ion-ripple-effect />
        <!--
        <ion-avatar slot="start">
          <img src={} alt="avatar" />
        </ion-avatar>
        
        
        -->
        <ion-label>
          <h2>{contact.name}</h2>
          <!--
          <h3>{contact.description}</h3>
          <p>{contact.lastmessage}</p>
          -->
        </ion-label>

      </ion-item>
    {/each}

    {:else}
    {#each messages as msg}
      <ion-item class={msg.author == userID? "msgmine": ""}>
        <ion-label>
          <ion-item color={msg.author == userID? "primary":"secondary"} class="msgtxt">
            <ion-label>
              {msg.text}
            </ion-label>
          </ion-item>
          <p>{msg.author}</p>
        </ion-label>
      </ion-item>
    {/each}
    {/if}
  </ion-list>
  </ion-card-content>
</ion-tab>

