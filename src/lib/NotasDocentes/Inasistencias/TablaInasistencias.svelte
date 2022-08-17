<script>
    export let dataInasistencias;
    let Headers;
    $: if (dataInasistencias.length > 0) {
        Headers = Object.keys(dataInasistencias[0]).map((key) =>
            key !== "imagensrc" ? key[0].toUpperCase() + key.slice(1) : ""
        );
    }
</script>

<main>
    <div class="table-responsive">
        <table
            class="table table-striped table-inverse table-responsive table-bordered  caption-top"
        >
            <caption class="fw-bold">
                <div>Inasistencias</div>
            </caption>
            <thead class="bg-warning bg-gradient bg-opacity-50">
                <tr>
                    <th>#</th>
                    {#each Headers as head}
                        {#if head !== "imagensrc" && head!==""}
                            <th class="text-center align-middle">{head}</th>
                        {/if}
                    {/each}
                </tr>
            </thead>
            <tbody>
                {#if dataInasistencias.length>0}
                {#each dataInasistencias as inasistencia, index}
                    <tr>
                        <td class="align-middle">
                            {index + 1}
                        </td>
                        {#each Object.keys(inasistencia) as dataInas}
                            {#if dataInas !== "imagensrc"}
                                <td class="text-center fs-bold align-middle">
                                    {#if dataInas === "excusa"}
                                        <img
                                            src={inasistencia["imagensrc"]}
                                            alt=""
                                            class="img-thumbnail rounded-circle"
                                            width="55"
                                            on:error={()=>this.src='./otros.png'}
                                        />
                                    {:else}
                                        <span class="fs-7"
                                            >{inasistencia[dataInas]}</span
                                        >
                                    {/if}
                                </td>
                            {/if}
                        {/each}
                    </tr>
                {/each}
                {/if}
            </tbody>
        </table>
    </div>
</main>

<style>
    .fs-7 {
        font-size: 0.83rem;
    }
</style>
