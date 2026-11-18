/** What a position's numbers come to, worked out as they change: the chart's settings and the journal's forms show the same four. */
import { Show } from 'solid-js';
import { money } from './model';
import type { Figures } from './legs';
import { tl } from '../lib/i18n';

export function Readout(props: { figures: Figures; hasLegs?: boolean; avgEntry?: string | null }) {
  const f = () => props.figures;
  return (
    <dl class="readout num">
      <div data-tip={props.hasLegs ? 'At the stop, every add and cut on the way filled' : 'What it loses if price reaches the stop'}>
        <dt>{props.hasLegs ? 'Max loss' : 'Loss at stop'}</dt>
        <dd class="bear">{money(-f().loss)}</dd>
      </div>
      <div data-tip="What it makes if price reaches the target">
        <dt>{tl('Profit at target')}</dt>
        <dd class="bull">{money(f().gain)}</dd>
      </div>
      <div data-tip="The target's distance over the stop's">
        <dt>{tl('Reward : risk')}</dt>
        <dd>{f().rr.toFixed(2)}</dd>
      </div>
      <div data-tip="The margin times the leverage: what the position is worth at its entry">
        <dt>{tl('Position')}</dt>
        <dd>{money(f().value).replace('+', '')}</dd>
      </div>
      <Show when={props.avgEntry}>
        <div data-tip="With every add filled">
          <dt>{tl('Avg entry')}</dt>
          <dd>{props.avgEntry}</dd>
        </div>
      </Show>
    </dl>
  );
}
