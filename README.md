# Applicazione con autenticazione SPID

Questo playbook Ansible implementa un esempio di applicazione nodejs che serve i propri contenuti in HTTPS e permette di proteggere una parte dell'applicazione tramite autenticazione SPID.

## Architettura

### Layer architetturali

L'architettura è basata su container Docker ed implementa tre layer applicativi:

* Layer HTTPS basato su NGINX e Letsencrypt
* Layer autenticazione SPID basato su NGINX (Openresty) e Shibboleth
* Layer applicativo (in questo esempio Nodejs ed Express)

Il layer applicativo, essendo un backend del layer di autenticazione, può essere implementato con qualsiasi tecnologia o framework e può anche risiedere su un host diverso da quello su cui risiedono i layer HTTPS e di autenticazione.

### Autenticazione

Il layer di autenticazione passa le informazioni di autenticazione al layer applicativo attraverso un set di header HTTP, presenti nel caso la sessione sia stata autenticata.

La gestione delle sessioni di autenticazione è delegata a Shibboleth e nell'esempio attuale é basata sullo [StorageService di default](https://wiki.shibboleth.net/confluence/display/SHIB2/NativeSPStorageService) che mantiene la cache delle sessioni in memoria. Questo comporta la perdita delle sessioni di autenticazione in caso di riavvio del container Shibboleth.

Modificando la configurazione di default è possibile implementare uno storage persistente tramite database ODBC o Memcache.

## Configurazione

Per la configurazione si faccia riferimento dal playbook `site.yml`.

## Esecuzione del playbook

```
$ ansible-playbook -i "$SERVER_HOST," site.yml
```

Dove `$SERVER_HOST` è l'host (raggiungibile via SSH) su cui eseguire il processo di configurazione.

__Nota__: attualmente il playbook assume che l'host utilizzi `apt` come sistema di gestione dei pacchetti.
