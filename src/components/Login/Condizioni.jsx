import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import React from "react";

export default function Condizioni(props) {
  return (
    <Dialog
      open={props.showCondizioni}
      onClose={() => props.setShowCondizioni(false)}
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
        <IconButton onClick={() => props.setShowCondizioni(false)}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers={true}>
        <DialogContentText>
          <h2>1. Contenuto del Servizio</h2>
          <p>
            Bluccino, società con sede legale in Russi (RA) Italia, mette a
            disposizione degli utenti che intendano avvalersene un servizio (da
            ora in poi il &quot;Servizio Base&quot; e/o &quot;Servizio&quot;)
            web based che consente di pubblicare e consultare annunci e
            inserzioni di soggetti privati o professionali che intendano
            acquistare o vendere beni durante un evento fieristico. Il Servizio
            consente altresì agli utenti interessati a quanto pubblicato di
            entrare in contatto tra di loro.
          </p>

          <p>
            2. Titolarità della piattaforma Bluccino, è l&#39;unica titolare
            della piattaforma web per il tramite della quale viene gestito il
            Servizio nonchè di tutti i relativi diritti inerenti e conseguenti
            allo sfruttamento della piattaforma medesima.
          </p>
          <h2>3. Applicabilità delle condizioni</h2>
          <p>
            Le presenti Condizioni Generali del Servizio si applicano sia agli
            utenti che utilizzino il Servizio in consultazione degli annunci
            pubblicati sia agli utenti inserzionisti privati o professionali
            (d‘ora in poi collettivamente “utente/i”).
          </p>
          <h2>4. Termini per l&#39;uso del Servizio</h2>
          <p>
            L’utilizzo del Servizio è consentito solo ad utenti maggiorenni
            secondo la legge italiana (maggiori di anni 18). L’eventuale
            utilizzo del Servizio è concesso altresì agli utenti che abbiano
            compiuto sedici anni  esclusivamente a valle della  autorizzazione e
            comunque sotto la supervisione dei genitori o di chi ne esercita la
            potestà o la tutela, che assumeranno quindi ogni responsabilità
            dell’operato del minore nei confronti di Bluccino e dei terzi ad
            ogni titolo coinvolti. L&#39;utilizzo del Servizio Base consente la
            registrazione ad un evento fieristico come visitatore e/o espositore
            e la possibilità di effettuare richieste agli espositori ai fini
            della ricerca di determinato materiale. La possibilità di
            registrarsi ad una fiera viene consentito da 24 ore prima
            dell’inizio della fiera fino a 24 ore dopo il termine della fiera.
            L’utilizzo del Servizio base consente di registrarsi gratuitamente
            come espositore e come visitatore; per ogni richiesta inserita è
            richiesta una commissione di € 1,50 per ogni richiesta. Per
            utilizzare il servizio base è necessaria la creazione di utenze
            finalizzate all&#39;utilizzo del servizio medesimo. Le conversazioni
            e i messaggi scambiati tra espositori e visitatori saranno
            disponibili al massimo entro 24 ore dalla conclusione dell’evento
            fieristico al quale ci si è registrati, trascorso il termine non
            sarà possibile accedere a tali dati. Le relazioni intrattenute tra
            gli utenti del Servizio, incluso l&#39;acquisto, lo scambio di
            informazioni, anche per il tramite del form di risposta
            all’annuncio, la consegna o il pagamento di beni o servizi,
            avvengono esclusivamente tra utenti senza che Bluccino sia parte
            della relazione. L&#39;utenza si impegna, altresì, a non fare
            utilizzo improprio dei contatti presenti a qualunque titolo sulla
            piattaforma di Celhoio.it. A titolo esemplificativo ma non esaustivo
            è vietato l&#39;invio di pubblicità, materiale promozionale, o
            qualsiasi altra forma di sollecitazione non autorizzata o non
            richiesta tramite e-mail o con qualsiasi altro metodo di contatto.
            Al momento della registrazione sul sito da parte dell’utente,
            quest’ultimo sarà tenuto a fornire i propri dati anagrafici reali
            senza ricorrere all&#39;utilizzo di indirizzi email temporanei o
            alias (ovvero indirizzi associati al proprio indirizzo email dal
            quale però non è possibile inviare email ma solo riceverle). Resta
            espressamente inteso che, in caso di mancata osservanza delle
            disposizioni della presente clausola da parte dell’utente, Bluccino
            sarà considerata liberata dell’onere di fornire taluni servizi di
            assistenza allo stesso, essendo questa impossibilitata alla verifica
            della corrispondenza utente-email.
          </p>
          <h2>5. Responsabilità dell&#39;utente</h2>
          <p>
            L&#39;utente è totalmente ed esclusivamente responsabile
            dell&#39;uso del Servizio (da intendersi espressamente con riguardo
            alle funzioni di pubblicazione, di consultazione, di gestione delle
            inserzioni e di contatto tra utenti) ed è pertanto l&#39;unico
            garante e responsabile dei beni e dei servizi offerti per il tramite
            del Servizio nonchè della correttezza, completezza e liceità delle
            inserzioni e del proprio comportamento nell&#39;ambito del contatto
            tra utenti. L&#39;utente garantisce la disponibilità e/o la
            titolarità del bene/servizio oggetto delle inserzioni medesime.
            L&#39;utente garantisce altresì che i propri annunci non violano
            alcun diritto d&#39;autore né diritto di proprietà industriale né
            altro diritto di terzi. In caso di contestazione da parte di terzi
            riguardo a qualsiasi annuncio o condotta ad esso legata,
            l&#39;utente se ne assume la piena responsabilità e si impegna a
            tenere manlevata e indenne Bluccino da qualsiasi danno, perdita o
            spesa. L&#39;utente si impegna ad utilizzare il form di risposta
            all’annuncio al solo scopo di prendere contatto e scambiare
            informazioni con gli altri utenti relativamente agli annunci,
            utilizzando un linguaggio consono, nel rispetto della legge,
            dell’etica e della netiquette. In ogni caso, l&#39;Utente si impegna
            a rispettare con qualsiasi le norme di buona educazione e
            l&#39;utilizzo di un linguaggio consono, sia online sia offline.
            L&#39;utente, inoltre, si assume ogni responsabilità per eventuali
            danni che possano derivare al suo sistema informatico dall&#39;uso
            del Servizio o a quello di terzi. Resta infine inteso che ogni
            eventuale utilizzo di robot, spider, scraper e/o ulteriori 
            strumenti automatici per accedere al sito e/o per estrapolare i
            relativi dati, contenuti, informazioni è espressamente vietato.
          </p>
          <h2>6. Limitazione di responsabilità</h2>
          <p>
            Bluccino non presta alcuna garanzia circa il contenuto, la
            completezza e la correttezza delle inserzioni pubblicate nè con
            riguardo ai dati pubblicati, né relativamente alle informazioni
            successivamente fornite dall’utente, nè con riferimento al numero o
            alla qualità dei risultati ottenuti tramite il Servizio. In ogni
            caso Bluccino si riserva, in qualsiasi momento, il diritto di
            valutare, approvare, eliminare o impedire l&#39;inserzione ovvero il
            diritto di inibire la consultazione o il contatto per il tramite del
            form di risposta all’annuncio nel caso in cui, a proprio
            insindacabile giudizio, l&#39;uso del Servizio da parte
            dell&#39;utente si riferisca a particolari sezioni merceologiche o
            possa considerarsi lesivo di diritti o delle prerogative di Bluccino
            o di terzi. Bluccino non presta alcuna garanzia circa il contenuto,
            la completezza e la correttezza delle inserzioni. Bluccino è altresì
            estranea alle trattative eventualmente nascenti dall&#39;uso del
            Servizio e pertanto non garantisce nè la bontà nè l&#39;esito delle
            stesse, di conseguenza nessuna richiesta di restituzione,
            compensazione, riparazione e/o risarcimento a qualunque titolo potrà
            essere indirizzata nei confronti di Bluccino Il Servizio è offerto
            per il tramite del sito www.celhoio.it e delle applicazioni mobile
            che possono contenere banner/link ad altri siti Internet o
            applicazioni che non sono sotto il controllo di Bluccino; la
            pubblicazione dei predetti banner/link non comporta l’approvazione o
            l’avallo da parte di Bluccino dei relativi siti e dei loro
            contenuti, né implica alcuna forma di garanzia da parte di
            quest’ultima che pertanto non si assume alcuna responsabilità.
            L&#39;utente riconosce, quindi, che Bluccino non è responsabile, a
            titolo meramente esemplificativo, della veridicità, correttezza,
            completezza, del rispetto dei diritti di proprietà intellettuale e/o
            industriale, né risponde della loro eventuale contrarietà all’ordine
            pubblico, al buon costume e/o alla morale.
          </p>
          <h2>7. Limitazioni nell&#39;erogazione del Servizio</h2>
          <p>
            Bluccino si riserva il diritto di modificare, sospendere o
            interrompere, in tutto o in parte, il Servizio in qualsiasi momento
            anche senza preavviso e senza che la stessa sia tenuta ad indicare
            le ragioni sottese alle predette azioni.  Bluccino non potrà quindi
            in nessun caso essere ritenuta parte o responsabile dello scambio di
            comunicazioni tra gli utenti e delle trattative da esse nascenti.
            Bluccino non potrà parimenti essere ritenuta responsabile dei danni
            conseguenti alla mancata prestazione del Servizio oggetto del
            presente contratto a causa dell&#39;errato o mancato funzionamento
            dei mezzi elettronici di comunicazione per cause estranee alla sfera
            del proprio prevedibile controllo. A titolo esemplificativo, ma non
            esaustivo, il malfunzionamento dei server ed altri dispositivi
            elettronici anche non facenti parte integrante della rete Internet,
            malfunzionamento dei software installati, virus informatici, nonchè
            da azioni di hacker o altri utenti aventi accesso alla rete.
          </p>
          <h2>8. Pubblicazione seriale di annunci e/o per conto terzi</h2>
          <p>
            E’ espressamente vietato, salvo esplicita autorizzazione da parte di
            Bluccino: - l&#39;utilizzo di sistemi automatici di caricamento
            annunci, salvo quelli espressamente autorizzati da Bluccino; - la
            pubblicazione seriale e/o la gestione di annunci per conto terzi con
            ogni mezzo o modalità; - rivendere a terzi i servizi di Bluccino.
          </p>
          <h2>
            9. Limitazioni al contenuto delle pubblicazioni ed informazioni
          </h2>
          <p>
            connesse al profilo dell&#39;utente L&#39;utente si impegna a non
            falsificare la propria identità ed a rispettare tutte le
            disposizioni di legge vigenti, che a tal fine l’utente accetta e
            riconosce di dover visionare prima dell’inserimento di ogni annuncio
            o di prendere contatto con un altro utente per il tramite del form
            di risposta. L&#39;utente si impegna altresì, a non utilizzare il
            Servizio per la pubblicazione, trasmissione, scambio di materiale
            illecito, volgare, osceno, calunnioso, diffamatorio, offensivo della
            morale corrente, o, comunque, lesivo dei diritti altrui o di
            messaggi incitanti all&#39;odio ed alla discriminazione razziale o
            religioso. Inoltre, l&#39;utente si impegna a non utilizzare il
            Servizio in maniera tale da violare diritti di proprietà
            intellettuale o industriale di Bluccino o di terzi. L’utente prende
            atto ed accetta che il Servizio richiederà, per finalità di
            revisione e sicurezza, il completamento di una specifica procedura
            di identificazione prima di procedere alla pubblicazione degli
            annunci o per accedere al Servizio e/o continuare ad usufruire dello
            stesso. A tal proposito l&#39;utente prende atto e accetta che ogni
            annuncio inserito riporterà obbligatoriamente in chiaro alcune delle
            informazioni di cui sopra, ed in particolare il numero di annunci
            online facenti capo all&#39;inserzionista ed una stima del tempo di
            utilizzo/frequentazione dello stesso del Servizio. Dette
            informazioni devono ritenersi frutto di calcoli automatici
            approssimativi e non devono interferire/pregiudicare/influenzare le
            trattative eventualmente nascenti dall&#39;uso del Servizio per le
            quali Bluccino resta estranea.
          </p>
          <h2>10. Pubblicazioni ulteriori</h2>
          <p>
            Bluccino vieta l’utilizzo da parte di software/applicazioni/siti cd.
            aggregatori e/o terzi, non espressamente e previamente autorizzati,
            di qualunque contenuto afferente al Servizio. Ogni violazione al
            predetto divieto potrà essere perseguito a norma di legge.
          </p>
          <h2>11. Giurisdizione, legge applicabile e foro competente</h2>
          <p>
            I rapporti tra Bluccinoe gli utenti sono regolati dalla legge e
            dalla giurisdizione italiana, in base alla quale anche le presenti
            Condizioni Generali dovranno essere interpretate. Salvo quanto
            disposto da norme di legge non derogabili, il Tribunale di Ravenna
            sarà competente in via esclusiva a dirimere ogni controversia
            riguardante le presenti Condizioni Generali ed i rapporti dalle
            stesse regolati.
          </p>
          <h2>12. Validità delle presenti Condizioni Generali</h2>
          <p>
            Le presenti condizioni Generali di Servizio si considereranno
            applicabili, ove compatibili, anche in caso di ulteriori, diversi e
            specifici accordi relativi ai servizi a pagamento. Bluccino potrà
            comunque apportare unilateralmente in qualsiasi momento modifiche
            alle presenti Condizioni Generali dandone comunicazione sulla
            propria piattaforma web.
          </p>
          <h2>13. Modifiche</h2>
          <p>
            Le presenti condizioni potrebbero essere soggette a modifiche. In
            caso di sostanziali modifiche, Bluccino avviserà l’utente
            pubblicandole con la massima evidenza sulle proprie pagine o tramite
            email o altro mezzo di comunicazione.
          </p>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
