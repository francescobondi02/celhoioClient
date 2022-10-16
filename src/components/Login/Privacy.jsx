import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import React from "react";

export default function Privacy(props) {
  return (
    <Dialog
      open={props.showPrivacy}
      onClose={() => props.setShowPrivacy(false)}
      scroll="paper"
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p>Condizioni generali del Servizio</p>
        <IconButton onClick={() => props.setShowPrivacy(false)}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers={true}>
        <DialogContentText>
          <h2>Politica sulla riservatezza</h2>
          Il sito www.celhoio.it è di proprietà di Bluccino, titolare del
          trattamento dei Suoi dati personali. Abbiamo adottato questa politica
          sulla privacy, la quale determina il trattamento delle informazioni
          raccolte da www.celhoio.it, oltre che i motivi per raccolta di certi
          dati personali a Lei correlati. Pertanto, deve leggere questa politica
          sulla riservatezza prima di usare il sito www.celhoio.it. Trattiamo i
          Suoi dati personali e garantiamo riservatezza e sicurezza degli
          stessi.
          <h2>Informazioni personali raccolte:</h2>
          Quando visita www.celhoio.it, raccogliamo automaticamente certe
          informazioni sul dispositivo, incluse informazioni su browser web,
          indirizzo IP, fuso orario e cookie installati sul dispositivo.
          Inoltre, navigando sul sito, raccogliamo informazioni sulle pagine web
          o i prodotti visualizzati, siti web o termini di ricerca di
          riferimento verso il sito e come Lei interagisce con il sito.
          Indichiamo tali informazioni raccolte automaticamente come
          “informazioni sul dispositivo”. Inoltre, potremmo raccogliere dati
          personali che ci fornisce (inclusi senza limitazione nome, cognome,
          indirizzo, informazioni di pagamento ecc.) durante la registrazione
          per soddisfare l&#39;accordo.
          <h2>Perché trattiamo i dati?</h2>
          La sicurezza dei dati dei clienti è una nostra priorità, pertanto
          trattiamo solo i dati degli utenti strettamente necessari per gestire
          il sito. Le informazioni raccolte automaticamente vengono utilizzate
          solo per identificare casi potenziali di abuso e stabilire statistiche
          sull&#39;uso del sito. Queste informazioni statistiche non sono
          aggregate in modo da identificare un utente specifico del sistema. Le
          è consentito visitare il sito senza rivelare informazioni, tramite le
          quali potrebbe essere identificato personalmente. Se, tuttavia,
          desidera utilizzare alcune delle funzioni del sito, o desidera
          ricevere newsletter o fornire altri dettagli compilando un modulo,
          potrebbe doverci fornire dati personali come email, nome, cognome,
          città di residenza, organizzazione e numero di telefono. Può scegliere
          di non fornire dati personali, tuttavia in tal caso non potrà
          usufruire di alcune funzioni del sito. Per esempio, non potrà ricevere
          la nostra newsletter o contattarci direttamente dal sito. Gli utenti
          che non sanno quali informazioni sono obbligatorie, possono
          contattarci a bluccino.lb@gmail.com.
          <h2>I Suoi diritti:</h2>
          Se è residente nell&#39;Unione Europea, dispone dei seguenti diritti
          sui dati personali:{" "}
          <ul>
            <li>Il diritto di essere informato.</li>
            <li>Il diritto all&#39;accesso.</li>
            <li>Il diritto di modifica.</li>
            <li>Il diritto di eliminazione.</li>
            <li>Il diritto di limitazione del trattamento.</li>
            <li>Il diritto di portabilità dei dati.</li>
            <li>Il diritto di obiezione.</li>
            <li>
              Il diritto in relazione a decisione e profilazione automatizzata.
            </li>
          </ul>{" "}
          Per esercitare questi diritti, si prega di contattarci tramite le
          informazioni di contatto sotto. Inoltre, se è residente
          nell&#39;Unione Europea, trattiamo le Sue informazioni al fine di
          stipulare i contratti con Lei (per esempio, in caso di ordine tramite
          il sito), o soddisfare in altro modo i nostri interessi commerciali
          legittimi indicati sopra. Ancora, notare che le informazioni possono
          essere trasferite fuori dall&#39;Europa, incluso in Canada e negli
          Stati Uniti.
          <h2>Collegamenti ad altri siti:</h2>
          Il nostro sito potrebbe contenere collegamenti ad altri siti non
          gestiti o controllati da noi. Notare che non siamo responsabili per le
          pratiche sulla riservatezza di altri siti o di terzi. Invitiamo a
          prestare attenzione nel caso in cui si esca dal sito e leggere le
          dichiarazioni sulla riservatezza di ogni sito che potrebbe raccogliere
          informazioni personali.
          <h2>Sicurezza delle informazioni:</h2>
          Proteggiamo le informazioni fornite su server informatici controllati,
          un ambiente sicuro protetto da accesso, uso o divulgazione non
          autorizzata. Adottiamo sistemi di protezione fisica, tecnica e
          amministrativa ragionevoli per proteggere da accesso, uso, modifica e
          divulgazione non autorizzata delle informazioni personali in nostro
          possesso. Nonostante ciò, nessuna trasmissione dei dati tramite
          Internet o rete wireless può essere completamente garantita come
          sicura.
          <h2>Avvertenza legale:</h2>
          Divulgheremo informazioni raccolte, usate o ricevute se richiesto o
          consentito dalla legge, come per rispettare ordini di tribunali o
          procedure legali simili, oltre che nel caso in cui riteniamo in buona
          fede che la divulgazione sia necessaria per proteggere i nostri
          diritti, proteggere la Sua sicurezza o la sicurezza di altri,
          investigare frode o rispondere a richieste governative. Informazioni
          di contatto: Per qualsiasi questione correlata ai diritti individuali
          o alle informazioni personali, può inviare un&#39;email a
          bluccino.lb@gmail.com.
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
